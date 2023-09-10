import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import isEmail from 'validator/lib/isEmail.js';
import UnauthorizedError from '../errors/UnauthorizedError.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Борюс Всемогущев',
  },
  email: {
    type: String,
    validate: {
      validator: isEmail,
    },
    unique: true,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials({ email, password }) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new UnauthorizedError('Не найден пользователь с данным ID'));

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new UnauthorizedError('Не верные почта или пароль'));

          return user;
        });
    });
};

export default mongoose.model('user', userSchema);
