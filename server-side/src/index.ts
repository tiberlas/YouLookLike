import express from 'express';
import { config } from './config';
import { UserDataMongo } from './user/user.data.mongo';

const logger = require('./interceptor/logger.interceptor');
const server = require('./server');
const restLogger = require('../src/comon/rest_logger');

const app: express.Application = server(new UserDataMongo());
app.use(logger);

app.listen(config.PORT, () => {
	console.log(`CAR LOOT STARTED ON PORT: ${config.PORT}`);
	restLogger.deleteFile();
});
