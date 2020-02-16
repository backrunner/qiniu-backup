<h2 align="center">qiniu-backup</h2>

## Overview

qiniu-backup is a tool using node-cron and the SDK from Qiniu for automatically back up your files to Qiniu.

## How to use

Run this command line when Git is installed:
```
git clone https://github.com/backrunner/qiniu-backup.git
```

Please ensure your environment has installed Node.js.

In qiniu-backup folder, copy **config.tmpl.js** to **config.js**, then filling it.

You can add multiple tasks into the config file.

Also, you can install it with npm, but I don't recommend you select this way, because you need to set up the config.

## How to run

Run the following line in terminal:

```
node index.js
```

or

```
npm run start
```

The best way to use this tool is run it by pm2.

```
pm2 start index.js --name qiniu-backup
```