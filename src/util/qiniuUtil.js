const { qiniu_key, qiniu_secret, qiniu_zone, qiniu_bucket, file_type } = require('../../config');
const qiniu = require('qiniu');
const logger = require('../logger');

// Set qiniu config and uploader
const mac = new qiniu.auth.digest.Mac(qiniu_key, qiniu_secret);
var qiniuConfig = new qiniu.conf.Config();
qiniuConfig.zone = 	qiniu.zone[qiniu_zone];
const formUploader = new qiniu.form_up.FormUploader(qiniuConfig);
const bucketManager = new qiniu.rs.BucketManager(mac, qiniuConfig);

const qiniuUtil = {
    fetchToken() {
        let options = {
            scope: qiniu_bucket
        };
        let putPolicy = new qiniu.rs.PutPolicy(options);
        return putPolicy.uploadToken(mac);
    },
    upload(token, file, file_key) {
        return new Promise((resolve, reject) => {
            let putExtra = new qiniu.form_up.PutExtra();
            formUploader.putFile(token, file_key, file, putExtra, (respErr, respBody, respInfo) => {
                if (respErr) {
                    logger.error('Upload file ['+file+'] failed.');
                    resolve({
                        success: false,
                        resp: respErr
                    });
                    return;
                }
                if (respInfo.statusCode == 200) {
                    logger.info('Backup file ['+file+'] is uploaded. File key: '+ file_key);
                    // set file to archive
                    if (file_type !== 0) {
                        bucketManager.changeType(qiniu_bucket, file_key, file_type, (err, respBody, respInfo) => {
                            if (err) {
                                logger.error('Change file ['+file_key+'] to archive.');
                                return;
                            }
                            logger.info(`File [${file_key}] has been changed to ${file_type == 1 ? '[low freq]' : file_type == 2 ? '[archive]' : '[normal]'}.`);
                        });
                    }
                    resolve({
                        success: true
                    });
                } else {
                    resolve({
                        success: false,
                        resp: respBody
                    });
                }
            });
        });
    }
};

module.exports = qiniuUtil;