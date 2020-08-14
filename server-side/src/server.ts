import express from 'express';
import { config } from './config';
import { UserData } from './user/user.data';

const userRest = require('./user/user.rest');

function server(userData: UserData): express.Application {
	const app: express.Application = express();
	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));

	app.use(config.BASE_URL, require('./user/admin/admin.rest'));
	app.use(config.BASE_URL, userRest(userData));

	return app;
}

module.exports = server;
