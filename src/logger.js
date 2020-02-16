const log4js = require('log4js');
const moment = require('moment');
const fs = require('fs');

const config = require('../config');

if (!fs.existsSync('logs')){
    fs.mkdirSync('logs');
}

log4js.configure({
    appenders: {
        console: {
            // output logs to console
            type : 'console',
        },
        dev: {
            type: 'file',
            filename: 'logs/dev_'+new moment().format('YYYYMMDDHHmmss')+'.log'
        },
        error: {
            type: 'file',
            filename: 'logs/error_'+new moment().format('YYYYMMDDHHmmss')+'.log'
        }
    },
    categories: {
        default: {
            appenders: ['error'],
            level: 'error'
        },
        dev: {
            appenders: ['console', 'dev'],
            level: 'all'
        }
    }
});

module.exports = log4js.getLogger(config.logger);