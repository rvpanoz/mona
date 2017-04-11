const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const winston = require('winston');

// log dir
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

/**
 * [winston setup]
 * @return [type] [description]
 */
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new(winston.Logger)({
	transports: [
		// colorize the output to the console
		new(winston.transports.Console)({
			timestamp: tsFormat,
			colorize: true,
			level: 'info'
		}),
		new(winston.transports.File)({
			filename: '../' + logDir + '/all-logs.log',
			timestamp: tsFormat,
			level: env === 'development' ? 'debug' : 'info'
		})
	]
});

module.exports = logger;
