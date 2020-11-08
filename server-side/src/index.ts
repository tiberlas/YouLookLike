import express from 'express';
import { appConfig } from './config';
import { CheckUserMongo } from './data/mongo/check-user.mongo';
import { RegisteredUserMongo } from './data/mongo/registered-user.mongo';
import { RequestUserMongo } from './data/mongo/request-user.mongo';
import { deleteLoggerFile } from './interceptor/logger.interceptor';
import { server } from './server';

const app: express.Application = server(
	new CheckUserMongo(),
	new RegisteredUserMongo(),
	new RequestUserMongo()
);

app.listen(appConfig.PORT, () => {
	console.log(`CAR LOOT STARTED ON PORT: ${appConfig.PORT}`);
	deleteLoggerFile()
});
