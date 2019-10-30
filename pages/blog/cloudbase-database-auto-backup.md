---
title: 小程序云开发之数据库自动备份
date: 2019-08-17
thumbnail: https://xpic.devtoken.club/blog/v2-ae70cfbfa0dc5d94ffb2260ea864375a_b.jpg
tags:
    - 云开发
    - 小程序
---

数据是无价的，我们通常会把重要的业务数据存放在数据库中，并需要对数据库做定时的自动备份工作，防止数据异常丢失，造成无法挽回的损失。

小程序云开发提供了方便的云数据库供我们直接使用，云开发使用了腾讯云提供的云数据库，拥有完善的数据保障机制，无需担心数据丢失。但是，我们还是不可避免的会担心数据库中数据的安全，比如不小心删除了数据集合，写入了脏数据等。

还好，云开发控制台提供了数据集合的导出，导入功能，我们可以手动备份数据库。不过，总是手动备份数据库也太麻烦了点，所有重复的事情都应该让代码去解决，下面我们就说说怎么搞定云开发数据库自动备份。

<!-- more -->

通过查阅微信的文档，可以发现云开发提供了数据导出接口[databaseMigrateExport](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/database/databaseMigrateExport.html)

```shell
POST https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=ACCESS_TOKEN
```

通过这个接口，结合云函数的定时触发功能，我们就可以做数据库定时自动备份了。梳理一下大致的流程：

1. 创建一个定时触发的云函数
2. 云函数调用接口，导出数据库备份文件
3. 将备份文件上传到云存储中以供使用

## 1. 获取 access_token

调用微信的接口需要 access_token，所以我们首先要获取 access_token。通过文档了解到使用 [auth.getAccessToken](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/access-token/auth.getAccessToken.html) 接口可以用小程序的 appid 和 secret 获取 access_token。

```js
// 获取 access_token
request.get(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
    (err, res, body) => {
        if (err) {
            // 处理错误
            return;
        }
        const data = JSON.parse(body);
        // data.access_token
    }
);
```

## 2. 创建数据库导出任务

获取 access_token 后，就可以使用 `databaseMigrateExport` 接口导出数据进行备份。

`databaseMigrateExport` 接口会创建一个数据库导出任务，并返回一个 job_id，这个 job_id 怎么用我们下面再说。显然数据库的数据导出并不是同步的，而是需要一定时间的，数据量越大导出所要花费的时间就越多，个人实测，2W 条记录，2M 大小，导出大概需要 3~5 S。

调用 `databaseMigrateExport` 接口需要传入环境 Id，存储文件路径，导出文件类型（1 为 JSON，2 为 CSV），以及一个 query 查询语句。

因为我们是做数据库备份，所以这里就导出 JSON 类型的数据，兼容性更好。需要备份的数据可以用 query 来约束，这里还是很灵活的，既可以是整个集合的数据，也可以是指定的部分数据，这里我们就使用 `db.collection('data').get()` 备份 data 集合的全部数据。同时我们使用当前时间作为文件名，方便以后使用时查找。

```js
request.post(
    `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
    {
        body: JSON.stringify({
            env,
            file_path: `${date}.json`,
            file_type: '1',
            query: 'db.collection("data").get()'
        })
    },
    (err, res, body) => {
        if (err) {
            // 处理错误
            return;
        }
        const data = JSON.parse(body);
        // data.job_id
    }
);
```

## 3. 查询任务状态，获取文件地址

在创建号数据库导出任务后，我们会得到一个 job_id，如果导出集合比较大，就会花费较长时间，这时我们可以使用 [databaseMigrateQueryInfo](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/database/databaseMigrateQueryInfo.html) 接口查询数据库导出的进度。

当导出完成后，会返回一个 `file_url`，即可以下载数据库导出文件的临时链接。

```js
request.post(
    `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${accessToken}`,
    {
        body: JSON.stringify({
            env,
            job_id: jobId
        })
    },
    (err, res, body) => {
        if (err) {
            reject(err);
        }

        const data = JSON.parse(body);
        // data.file_url
    }
);
```

获取到文件下载链接之后，我们可以将文件下载下来，存入到自己的云存储中，做备份使用。如果不需要长时间的保留备份，就可以不用下载文件，只需要将 job_id 存储起来，当需要恢复备份的时候，通过 job_id 查询到新的链接，下载数据恢复即可。

至于 job_id 存在哪，就看个人想法了，这里就选择存放在数据库里。

```js
await db.collection('db_back_info').add({
    data: {
        date: new Date(),
        jobId: job_id
    }
});
```

##  4.  函数定时触发器

云函数支持定时触发器，可以按照设定的时间自动执行。云开发的定时触发器采用的 `Cron` 表达式语法，最大精度可以做的秒级，详细的使用方法可以参考官方文档：[定时触发器 | 微信开放文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/triggers.html)

这里我们配置函数每天凌晨 2 点触发，这样就可以每天都对数据库进行备份。在云函数目录下新建 `config.json`文件，写入如下内容：

```js
{
  "triggers": [
    {
      "name": "dbTrigger",
      "type": "timer",
      "config": "0 0 2 * * * *"
    }
  ]
}
```

## 完整代码

最后，贴出可以在云函数中使用的完整代码，只需要创建一个定时触发的云函数，并设置好相关的环境变量即可使用

- appid
- secret
- backupColl：需要备份的集合名称，如 ‘data’
- backupInfoColl：存储备份信息的集合名称，如 ‘db_back_info’

注意，云函数的默认超时时间是 3 秒，创建备份函数时，建议将超时时间设定到最大值 20S，留有足够的时间查询任务结果。


```js
/* eslint-disable */
const request = require('request');
const cloud = require('wx-server-sdk');

// 环境变量
const env = 'xxxx';

cloud.init({
    env
});

// 换取 access_token
async function getAccessToken(appid, secret) {
    return new Promise((resolve, reject) => {
        request.get(
            `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
            (err, res, body) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(JSON.parse(body));
            }
        );
    });
}

// 创建导出任务
async function createExportJob(accessToken, collection) {
    const date = new Date().toISOString();

    return new Promise((resolve, reject) => {
        request.post(
            `https://api.weixin.qq.com/tcb/databasemigrateexport?access_token=${accessToken}`,
            {
                body: JSON.stringify({
                    env,
                    file_path: `${date}.json`,
                    file_type: '1',
                    query: `db.collection("${collection}").get()`
                })
            },
            (err, res, body) => {
                if (err) {
                    reject(err);
                }

                resolve(JSON.parse(body));
            }
        );
    });
}

// 查询导出任务状态
async function waitJobFinished(accessToken, jobId) {
    return new Promise((resolve, reject) => {
        // 轮训任务状态
        const timer = setInterval(() => {
            request.post(
                `https://api.weixin.qq.com/tcb/databasemigratequeryinfo?access_token=${accessToken}`,
                {
                    body: JSON.stringify({
                        env,
                        job_id: jobId
                    })
                },
                (err, res, body) => {
                    if (err) {
                        reject(err);
                    }

                    const { status, file_url } = JSON.parse(body);

                    console.log('查询');

                    if (status === 'success') {
                        clearInterval(timer);
                        resolve(file_url);
                    }
                }
            );
        }, 500);
    });
}

exports.main = async (event, context) => {
    // 从云函数环境变量中读取 appid 和 secret 以及数据集合
    const { appid, secret, backupColl, backupInfoColl } = process.env;

    const db = cloud.database();

    try {
        // 获取 access_token
        const { errmsg, access_token } = await getAccessToken(appid, secret);

        if (errmsg && errcode !== 0) {
            throw new Error(`获取 access_token 失败：${errmsg}` || '获取 access_token 为空');
        }

        // 导出数据库
        const { errmsg: jobErrMsg, errcode: jobErrCode, job_id } = await createExportJob(access_token, backupColl);

        // 打印到日志中
        console.log(job_id);

        if (jobErrCode !== 0) {
            throw new Error(`创建数据库备份任务失败：${jobErrMsg}`);
        }

        // 将任务数据存入数据库
        const res = await db.collection('db_back_info').add({
            data: {
                date: new Date(),
                jobId: job_id
            }
        });

        // 等待任务完成
        const fileUrl = await waitJobFinished(access_token, job_id);

        console.log('导出成功', fileUrl);

        // 存储到数据库
        await db
            .collection(backupInfoColl)
            .doc(res._id)
            .update({
                data: {
                    fileUrl
                }
            });
    } catch (e) {
        throw new Error(`导出数据库异常：${e.message}`);
    }
};
```
