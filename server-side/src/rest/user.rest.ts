import express from 'express';
import { CheckUserData } from '../data/interfaces/check-user.data';
import { RequestUserData } from '../data/interfaces/request-user.data';
import { RegisteredUserData } from '../data/interfaces/registered-user.data';
import { restError } from '../error/rest-return-error';
import { UserService } from './user.service';
import { UserModel } from '../model/user.model';
import { CredentialModel } from '../model/credential.model';

export const userRest = (
  checkUserData: CheckUserData,
  requestUserData: RequestUserData,
  registeredUserData: RegisteredUserData
) => {
  const router: express.Router = express.Router();
  const userService = new UserService(
    checkUserData,
    requestUserData,
    registeredUserData,
  );

  /**TEST CONNECTION */
  router.get('/test', (req, res) => {
    return res.status(418).send("I am a teapot!?");
  });

  /**REGISTER */
  router.post('/registration',
    async (req: express.Request, res: express.Response) => {
      let status = 201;
      let content: any = { message: 'CREATED' };
      const user: UserModel = req.body;

      try {
        const createdUser = await userService.createRequest(user);
        content.user = createdUser;
      } catch (err) {
        let error = restError(err);
        status = error.status;
        content = error.msg;
      }

      return res.status(status).json(content);
    });

  /**SIGN IN CREATE JWT */
  router.post('/authenticate',
    async (req: express.Request, res: express.Response) => {
      let status = 202;
      let content: any = { message: 'ACCEPTED' };
      const credentials: CredentialModel = req.body;

      try {
        const token = await userService.authenticate(credentials);
        content.jwt = token;
      } catch (err) {
        let error = restError(err);
        status = error.status;
        content = error.msg;
      }

      return res.status(status).json(content);
    });

  return router;
}
