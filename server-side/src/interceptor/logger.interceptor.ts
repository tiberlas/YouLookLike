import { RestLogger } from '../common/rest_logger';

export const restLogger = (req: any, res: any, next: any): void => {

	//TODO: from JWT read user name
	const restLogger: RestLogger = new RestLogger();
	restLogger.log(req.method, req.path, 'NOT REGISTERED');

	next();
};

export const deleteLoggerFile = (): void => {
	const restLogger: RestLogger = new RestLogger();
	restLogger.deleteFile();
}
