const cron = require('node-cron');
const config = require('./config');
const worker = require('./src/worker');

// logger
const logger = require('./src/logger');

// transform time
let time = config.backup_time.split(':');

// start cron
cron.schedule('0 '+parseInt(time[1])+' '+parseInt(time[0])+' */'+config.backup_per_day+' * *', ()=>{
    logger.debug('Starting a backup task.');
    worker.doBackup();
});

logger.debug('Backup service started.');

// test
worker.doBackup();