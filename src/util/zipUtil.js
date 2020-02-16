const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment');
const logger = require('../logger');
const path = require('path');
const process = require('process');

// set up path
const tempPath = path.join(process.cwd(), 'temp');
// check if tempPath existed
if (!fs.existsSync(tempPath)) {
    fs.mkdir(tempPath, (err) => {
        if (err) {
            logger.error('Cannot create temp path.');
            process.exit();
        }
    });
}

const zipUtil = {
    pack(folders, taskName) {
        return new Promise((resolve, reject) => {
            // check folders
            if (!folders || folders.length < 1) {
                resolve ({
                    success: false,
                    message: 'Folders cannot be empty'
                });
                return;
            }
            // create archive
            let archive = archiver('zip', {
                zlib: { level: 9 }
            });
            // set up counter
            let not_found_counter = 0;
            // set zip path
            let zipName = taskName + '_' + new moment().format('YYYYMMDDHHmmss') + '.zip';
            let zipPath = path.join(tempPath, zipName);
            let output = fs.createWriteStream(zipPath);
            archive.on('error', (err) => {
                logger.error(err);
                resolve({
                    success: false,
                    message: err
                });
            });
            output.on('end', function() {
                logger.debug('Zip file output end. Filename: '+zipName);
            });
            output.on('close', function() {
                logger.debug('Writing packed data to file is done.');
                // check not_found_counter
                if (not_found_counter == folders.length) {
                    resolve({
                        success: false,
                        zipName: zipName,
                        zipPath: zipPath
                    });
                } else {
                    resolve({
                        success: true,
                        zipName: zipName,
                        zipPath: zipPath
                    });
                }
            });
            archive.pipe(output);
            for (let folder of folders){
                if (!fs.existsSync(folder)){
                    logger.error('Folder ['+folder+'] is not existed.');
                    not_found_counter++;
                    continue;
                }
                archive.directory(folder);
            }
            archive.finalize();
        });
    }
};

module.exports = zipUtil;