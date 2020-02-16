const { backup_tasks } = require('../config');
const qiniuUtil = require('./util/qiniuUtil');
const zipUtil = require('./util/zipUtil');
const logger = require('./logger');
const fs = require('fs');

const worker = {
    async doBackup() {
        // fetch qiniu token
        let token = qiniuUtil.fetchToken();
        // do tasks
        for (let task of backup_tasks){
            logger.debug('Starting task ['+task.name+'] to pack files...');
            // pack up files
            let ret_zip = await zipUtil.pack(task.folders, task.name);
            if (!ret_zip.success) {
                logger.error('Pack file failed in task ['+task.name+']!');
                // try unlink the failed zip file
                this.unlink();
                continue;
            }
            // upload zip file
            logger.debug('Starting upload the backup created by task ['+task.name+']...');
            let ret_upload = await qiniuUtil.upload(token, ret_zip.zipPath, ret_zip.zipName);
            if (!ret_upload.success) {
                logger.error('Upload zip file failed in task ['+task.name+']!');
                continue;
            }
            // unlink zip file
            this.unlink(ret_zip.zipPath);
        }
    },
    unlink(zipPath) {
        if (!zipPath) {
            return;
        }
        if (fs.existsSync(zipPath)){
            fs.unlink(zipPath, (err) => {
                if (err){
                    logger.warn('Temp file cannot unlink.');
                } else {
                    logger.debug('Temp file ['+zipPath+'] is unlinked.');
                }
            });
        }
    }
};

module.exports = worker;