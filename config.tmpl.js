const config = {
    qiniu_key: "",
    qiniu_secret: "",
    qiniu_bucket: "",
    // CNEast:Zone_z0 CNNorth:Zone_z1 CNSouth:Zone_z2 NA:Zone_na0 SEA:Zone_as0
    qiniu_zone: "Zone_z2",
    // Normal: 0, Low Freq: 1, Archieved: 2
    file_type: 0,
    backup_per_day: 1,
    // backup trigger time
    backup_time: "00:00",
    logger: "error",
    backup_tasks: [
        {
            name: "default",
            // use task name as path prefix, it will look like /[taskname]/[timestamp].zip
            // if set to false. backup file will be put into root path directly,
            // like: /[taskname]_[timestamp].zip
            prefix: true,
            // create folder by month
            // only enabled when prefix is true
            // like: /[taskname]/202001/[timestamp].zip
            month_foler: true,
            // folders need to be pack up
            folders: [
                ''
            ]
        }
    ]
};

module.exports = config;