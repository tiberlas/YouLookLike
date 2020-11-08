import jwt from 'jsonwebtoken';
import { UserModel } from '../model/user.model';
import { appConfig } from '../config';

export const generateToken = (user: UserModel) => {
  return jwt.sign(
    {
      userName: user.userName,
      userEmail: user.email,
      userIdentity: user.userId
    },
    appConfig.JWT_SECRET,
    {
      expiresIn: '1800s'
    }
  );
}