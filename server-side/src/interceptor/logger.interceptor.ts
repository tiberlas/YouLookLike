const restLogger = require('../comon/rest_logger');

const logger = (req: any, res: any, next: any) => {
	req.get;

	restLogger.log(req.method, req.path, 'test');
	next();
};

module.exports = logger;
