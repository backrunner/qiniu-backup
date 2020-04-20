const cron = require('node-cron');
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
}
if (minute < 0 || minute >= 60) {
    logger.error('Trigger time is not valid');
    process.exit();
}
if (hour < 0 || hour >= 24) {
    logger.error('backup_per_day must be a integer greater than 0.');
}

// start cron
cron.schedule(`0 ${minute} ${hour} */${config.backup_per_day} * *`, ()=>{
    logger.debug('Starting a backup task.');
    worker.doBackup();
});

logger.debug('Backup service started.');