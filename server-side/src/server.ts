import express from 'express';
import { config } from './config';
import { restLogger } from './interceptor/logger.interceptor';
import { UserData } from './user/user.data';
import { userRest } from './user/user.rest';
import { adminRest } from './user/admin/admin.rest';
import path from 'path';

export const server = (userData: UserData): express.Application => {
	const app: express.Application = express();
	const clientPath: string = path.join(__dirname, '..', 'client');

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(restLogger);

	app.use(config.BASE_URL, adminRest(userData));
	app.use(config.BASE_URL, userRest(userData));

	app.use(express.static(clientPath));
	return app;
}
