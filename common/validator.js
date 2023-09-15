import { celebrate, Joi } from 'celebrate';
import { regexEmail, regexUrl } from '../utils/constants.js';

export default () => {
  // проверка почты
  const checkEmail = (email) => String(email)
    .toLowerCase()
    .match(regexEmail);

  // проверка аватара
  const checkImgURL = (url) => String(url)
    .toLowerCase()
    .match(regexUrl);

  const loginUserValidator = celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  });

  const createUserValidator = celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  });

  const createMovieValidator = celebrate({
    body: Joi.object().keys({
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      country: Joi.string().required(),
      director: Joi.string().required(),
      description: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      image: Joi.string().required().regex(regexUrl),
      thumbnail: Joi.string().required().regex(regexUrl),
      trailerLink: Joi.string().required().regex(regexUrl),
    }),
  });

  const updUserInfoValidator = celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(2).max(30).required(),
    }),
  });

  const checkId = celebrate({
    params: Joi.object().keys({
      id: Joi.string().hex().length(24).required(),
    }),
  });

  return {
    checkId,
    checkEmail,
    checkImgURL,
    loginUserValidator,
    createUserValidator,
    createMovieValidator,
    updUserInfoValidator,
  };
};
