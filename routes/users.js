import { Router } from 'express';
import {
  getUsers, getUserByID, getUserMe, updateProfile,
} from '../controllers/users.js';
import Validator from '../common/validator.js';

const router = Router();
const { checkId, updUserInfoValidator } = Validator();

router.get('/', getUsers);
router.get('/me', getUserMe);
router.get('/:id', checkId, getUserByID);

router.patch('/me', updUserInfoValidator, updateProfile);

export default router;
