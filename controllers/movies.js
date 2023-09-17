import mongoose from 'mongoose';
import escape from 'escape-html';
import Movie from '../models/movie.js';
import WrongDataError from '../errors/WrongDataError.js';
import NotFoundError from '../errors/NotFoundError.js';
import ForbiddenError from '../errors/ForbiddenError.js';

const handlerError = (res, err, next) => {
  if (err instanceof mongoose.Error.CastError || err.name === 'ValidationError') {
    next(new WrongDataError('Некорректный данные фильма'));
  } else {
    next(err);
  }
};

const handlerResult = (res, data, newRes = false) => {
  res.status(newRes ? 201 : 200).send(data);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie
    .find({ owner })
    .populate('owner')
    .sort({ _id: -1 })
    .then((movies) => handlerResult(res, movies))
    .catch((err) => handlerError(res, err, next));
};

const createMovie = (req, res, next) => {
  const userData = req.body;
  const owner = req.user._id;

  Object.entries(userData).forEach(([key, value]) => {
    userData[key] = escape(value);
  });

  Movie
    .create({ ...userData, owner })
    .then((movie) => movie.populate(['owner']))
    .then((movie) => handlerResult(res, movie, true))
    .catch((err) => handlerError(res, err, next));
};

const deleteMovie = (req, res, next) => {
  const idMovie = req.params.id;
  const idUser = req.user._id;

  Movie
    .findById(idMovie)
    .populate(['owner'])
    .then((movie) => {
      if (!movie) throw new NotFoundError('Фильм не найдена');

      if (movie.owner._id.toString() !== idUser) {
        throw new ForbiddenError('Недостаточно прав');
      }
      return movie.deleteOne({ _id: movie._id });
    })
    .then((data) => handlerResult(res, data))
    .catch((err) => handlerError(res, err, next));
};

export {
  getMovies, createMovie, deleteMovie,
};
