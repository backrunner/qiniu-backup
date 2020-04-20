const config = require('./config');
const worker = require('./src/worker');

// logger
const logger = require('./src/logger');

// do backup
logger.info('Backup test started...');
worker.doBackup();
