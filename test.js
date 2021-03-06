const config = require('./config');
const worker = require('./src/worker');

// logger
const logger = require('./src/logger');

// transform time
let time = config.backup_time.split(':');
let minute = parseInt(time[1]);
let hour = parseInt(time[0]);

// validation
if (config.backup_per_day <= 0) {
    logger.error('backup_per_day must be a integer greater than 0.');
    process.exit();
}
if (minute < 0 || minute >= 60) {
    logger.error('Trigger time is not valid.');
    process.exit();
}
if (hour < 0 || hour >= 24) {
    logger.error('backup_per_day must be a integer greater than 0.');
    process.exit();
}
if (config.file_type < 0 || config.file_type > 2) {
    logger.error('file_type must be an integer in 0 - 2.');
    process.exit();
}

// do backup
logger.info('Backup test started...');
worker.doBackup();
