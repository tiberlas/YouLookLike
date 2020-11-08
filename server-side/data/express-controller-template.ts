import express from 'express';

export const adminUserRest = (
  DEPENDENCIES: any
): express.Router => {
  const router = express.Router();

  router.get('/path/',
    async (req: express.Request, res: express.Response) => {
      let status = 200;
      let content: any = {};

      try {

      } catch (err) {
        let error = restError(err);
        status = error.status;
        content = error.msg;
      }

      return res.status(status).json(content);
    });


  return router;