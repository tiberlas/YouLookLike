import express from 'express';
import { config } from './config';
import { UserDataMongo } from './user/user.data.mongo';
import { deleteLoggerFile } from './interceptor/logger.interceptor';
import { server } from './server';

const app: express.Application = server(new UserDataMongo());

app.listen(config.PORT, () => {
	console.log(`CAR LOOT STARTED ON PORT: ${config.PORT}`);
	deleteLoggerFile()
});
