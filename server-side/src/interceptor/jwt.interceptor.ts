import express from 'express';
import jwt from 'jsonwebtoken';
import { appConfig } from '../config';

export const authenticationInterceptor = (
  req: express.Request | any,
  res: express.Response,
  next: any
) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401) // if there isn't any token

  jwt.verify(token, appConfig.JWT_SECRET as string, (err: any, user: any) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next();
  })
}