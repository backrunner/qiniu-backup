const config = {
    qiniu_key: "",
    qiniu_secret: "",
    qiniu_bucket: "",
    backup_per_day: 1,
    backup_time: "00:00",
    logger: "error",
    backup_tasks: [
        {
            "name": "default",
            "folders": [
                ''
            ]
        }
    ]
};

module.exports = config;