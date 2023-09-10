import { Router } from 'express';
import {
  getMovies, createMovie, deleteMovie,
} from '../controllers/movies.js';
import Validator from '../common/validator.js';

const router = Router();
const { createMovieValidator, checkId } = Validator();

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:id', checkId, deleteMovie);

export default router;
