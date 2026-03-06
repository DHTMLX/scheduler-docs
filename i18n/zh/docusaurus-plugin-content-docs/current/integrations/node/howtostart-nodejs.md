---
title: "dhtmlxScheduler 与 Node.js 集成"
sidebar_label: "dhtmlxScheduler 与 Node.js 集成"
---

# dhtmlxScheduler 与 Node.js 集成

本教程将指导你如何使用 Node.js 在服务端通过 REST API 构建一个 Scheduler。如果你正在使用其他技术栈，可以参考以下集成选项:

- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)

我们的 Node.js Scheduler 配置将依赖于 REST API 进行服务器通信。幸运的是，Node.js 提供了多种现成的解决方案，无需从零开始开发。

本教程将使用 [Express](http://expressjs.com/) 框架，并以 MySQL 作为数据存储。

:::note
完整源码可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-node) 获取。
:::

## 步骤 1. 初始化项目

### 创建项目

首先使用 yarn 或 npm 创建一个新应用:

~~~
$ mkdir scheduler-howto-nodejs
$ cd ./scheduler-howto-nodejs
$ yarn init // 或 npm init
~~~

初始化过程中，你需要回答一些简单的问题:

~~~
$ question name (scheduler-howto-nodejs):
$ question version (1.0.0):
$ question description: My scheduler backend
$ question entry point (index.js): server.js
$ question repository url:
$ question author: Me
$ question license (MIT): MIT
$ question private:
$ success Saved package.json
~~~

此过程会生成一个 *package.json* 文件，内容大致如下:

~~~
{
    "name": "scheduler-backend",
    "version": "1.0.0",
    "main": "server.js",
    "author": "Me",
    "license": "MIT",
}
~~~

### 添加依赖并安装模块

如前所述，示例项目使用 [Express](http://expressjs.com/) 和 MySQL。

:::note
请确保你已配置好 MySQL 服务器，或者可以考虑使用 [Free MySQL Hosting](https://www.freemysqlhosting.net/)。
:::

通过以下命令安装 express、mysql、body-parser 和 date-format-lite 模块:

~~~
$ yarn add express mysql body-parser date-format-lite
~~~

或

~~~
$ npm install express mysql body-parser date-format-lite
~~~

由于入口文件设置为 **server.js**，请创建该文件并添加如下内容:

~~~js title="server.js"
const express = require("express"); // 使用 Express
const bodyParser = require("body-parser"); // 解析 POST 请求
const app = express(); // 创建应用实例
const port = 3000; // 监听端口

// 解析 POST 请求所必需
// 以下代码用于解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

// 启动服务器
app.listen(port, () => {
    console.log("Server is running on port " + port + "...");
});
~~~

接下来，在 **package.json** 中添加 "scripts" 部分:

~~~
"scripts": {
    "start": "node server.js"
}
~~~

此时，**package.json** 文件应如下所示:

~~~
{
    "name": "scheduler-howto-node",
    "version": "1.0.0",
    "main": "server.js",
    "license": "MIT",
    "scripts": {
        "start": "node server.js"
    },
    "dependencies": {
        "body-parser": "^1.20.0",
        "date-format-lite": "^17.7.0",
        "express": "^4.18.1",
        "mysql": "^2.18.1",
    }
}
~~~

现在可以通过以下命令启动服务器:

~~~
$ yarn start
~~~

或

~~~
$ npm start
~~~


## 步骤 2. 在页面中添加 Scheduler

创建一个目录用于存放前端 HTML、CSS 和 JS 文件:

~~~
$ mkdir ./public
~~~

在 **public** 文件夹下，创建一个 *index.html* 文件，内容如下:

~~~js title="public/index.html"
<!doctype html>
<html>
    <head>
        <title>DHTMLX Sсheduler example</title>
        <meta charset="utf-8">
        <!-- scheduler -->
        <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"
            charset="utf-8"></script>
      <link href="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.css"
              rel="stylesheet" type="text/css" charset="utf-8">
        <style>
            html, body{
                margin:0px;
                padding:0px;
                height:100%;
                overflow:hidden;
            }
        </style>
    </head>
    <body>
        <div id="scheduler_here" class="dhx_cal_container">
            <div class="dhx_cal_navline">
                <div class="dhx_cal_prev_button">&nbsp;</div>
                <div class="dhx_cal_next_button">&nbsp;</div>
                <div class="dhx_cal_today_button"></div>
                <div class="dhx_cal_date"></div>
                <div class="dhx_cal_tab" name="day_tab"></div>
                <div class="dhx_cal_tab" name="week_tab"></div>
                <div class="dhx_cal_tab" name="month_tab"></div>
            </div>
            <div class="dhx_cal_header"></div>
            <div class="dhx_cal_data"></div>
        </div>
        <script>
            scheduler.config.load_date="%Y-%m-%d %H:%i";
            scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
            scheduler.setLoadMode("day");
 
            // load data from backend
            scheduler.load("/events");
 
            // connect backend to scheduler
            const dp = scheduler.createDataProcessor({
                url: "/events",
                mode: "REST"
            });
        </script>
    </body>
</html>
~~~

这段代码设置了基础的 HTML 布局，引入了来自 CDN 的 dhtmlxScheduler，并通过 [init](api/method/init.md) 方法初始化了 scheduler。请注意，文档 body 和 scheduler 容器都设置为 100% 高度，以确保 scheduler 能够正确填充其容器。

### 配置路由

为了让新页面可访问，请在 **server.js** 文件的 `"app.listen(...);"` 之前添加如下代码:

~~~js title="server.js"
// 从 "./public" 目录返回静态页面
app.use(express.static(__dirname + "/public"));
~~~

重启应用以应用更改。

现在，在浏览器中打开 *http://localhost:3000/* 即可访问 *index.html* 页面。

![howtostart_nodejs_init](/img/howtostart_nodejs_init.png)

## 步骤 3. 数据库准备

在 scheduler UI 就绪后，下一步是将其与数据库连接，并定义读取和写入事件的方法。

### 创建数据库

首先，创建一个数据库。你可以使用喜欢的 MySQL 客户端或通过控制台操作。

使用 MySQL 客户端，运行如下命令:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

或者，将上述 SQL 保存为 *dump.sql* 文件，并通过 MySQL 控制台导入:

~~~
$ mysql -uuser -ppass scheduler < dump.sql
~~~

接下来，在 **server.js** 中以常量形式定义你的 MySQL 连接配置，便于后续使用:

~~~js title="server.js"
// MySQL 用于数据库访问，util 用于 Promise 化查询
const util = require("util");
const mysql = require('mysql');

// 使用你自己的数据库连接参数
const mysqlConfig = {
    "connectionLimit": 10,
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "scheduler"
};
~~~

配置完成后，通过如下方式在应用中连接数据库:

~~~js title="server.js"
// 打开 mysql 连接池
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);
~~~

这里使用了 [连接池](https://github.com/mysqljs/mysql#pooling-connections) 并通过 [util.promisify](https://nodejs.org/dist/latest-v8.x/docs/api/util.html#util_util_promisify_original) 将查询封装为 Promise。虽然不是强制要求，但这种方式让代码更简洁易维护。

下一步，我们会将数据库访问逻辑封装到一个独立的 Storage 类中，负责连接和 CRUD 操作。


## 步骤 4. 实现 CRUD

### 实现数据访问

所有的数据读写逻辑将被组织在一个 `Storage` 模块中。该类接收 MySQL 连接，负责指定表的 CRUD 操作:获取所有事件、新增、更新和删除事件。

创建名为 *storage.js* 的文件，并添加如下代码:

~~~js title="storage.js"
require("date-format-lite"); // 添加日期格式化

class Storage {
    constructor(connection, table) {
        this._db = connection;
        this.table = "events";
    }

    // 获取表中的事件，如有参数则使用动态加载
    async getAll(params) {
        let query = "SELECT * FROM ??";
        let queryParams = [
            this.table
        ];

        let result = await this._db.query(query, queryParams);

        result.forEach((entry) => {
            // 格式化日期和时间
            entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
            entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
        });
        return result;
    }

    // 新增事件
    async insert(data) {
        let result = await this._db.query(
            "INSERT INTO ?? (`start_date`, `end_date`, `text`) VALUES (?,?,?)",
            [this.table, data.start_date, data.end_date, data.text]);

        return {
            action: "inserted",
            tid: result.insertId
        }
    }

    // 更新事件
    async update(id, data) {
        await this._db.query(
            "UPDATE ?? SET `start_date` = ?, `end_date` = ?, `text` = ? WHERE id = ?",
            [this.table, data.start_date, data.end_date, data.text, id]);

        return {
            action: "updated"
        }
    }

    // 删除事件
    async delete(id) {
        await this._db.query(
            "DELETE FROM ?? WHERE `id`=? ;",
            [this.table, id]);

        return {
            action: "deleted"
        }
    }
}

module.exports = Storage;
~~~

### 路由配置

接下来，需要配置路由，使页面上的 scheduler 能够访问 storage。

为此，新建一个辅助模块 `router`：

~~~js title="router.js"
function callMethod (method) {
    return async (req, res) => {
        let result;

        try {
            result = await method(req, res);
        } catch (e) {
            result =  {
                action: "error",
                message: e.message
            }
        }

        res.send(result);
    }
};

module.exports = {
    setRoutes (app, prefix, storage) {
        app.get(`${prefix}`, callMethod((req) => {
            return storage.getAll(req.query);
        }));

        app.post(`${prefix}`, callMethod((req) => {
            return storage.insert(req.body);
        }));

        app.put(`${prefix}/:id`, callMethod((req) => {
            return storage.update(req.params.id, req.body);
        }));

        app.delete(`${prefix}/:id`, callMethod((req) => {
            return storage.delete(req.params.id);
        }));
    }
};
~~~

该模块配置应用监听 scheduler 发送的请求 URL，并调用相应的 storage 方法。

请注意，所有方法都被 `try-catch` 块包裹，以捕获任何错误并向客户端返回合适的错误响应。关于 [错误处理](https://docs.dhtmlx.com/scheduler/server_integration.html#errorhandling) 可查看更多细节。

另外需要注意的是，异常信息直接在 API 响应中返回。这在开发阶段很有用，但在生产环境中建议隐藏这些信息，以避免暴露敏感内容（如 MySQL 原始错误详情）。

### 协同工作

当所有部分都准备好后，你可以通过 Router 将 Storage 连接到应用程序:

~~~js title="server.js"
const router = require("./router");

// 打开到 mysql 的连接
const connectionPool = mysql.createPool(mysqlConfig);
connectionPool.query = util.promisify(connectionPool.query);

// 为基本的 CRUD 请求添加监听器
const Storage = require("./storage");
const storage = new Storage(connectionPool);
router.setRoutes(app, "/events", storage);
~~~

重启应用程序后，你就可以在调度器中创建、删除和修改事件，并且所有更改在页面刷新后都能保留。

![howtostart_nodejs_crud](/img/howtostart_nodejs_crud.png)

## 动态加载

目前，调度器在启动时会从 *events* 表加载所有记录。如果数据量较小，这种方式没问题。但对于如计划或预订类应用，旧记录不会被移除或归档，数据会迅速增长。几个月后，每次页面加载时应用可能会请求数兆字节的事件数据。

动态加载可以避免这个问题。调度器会将当前显示的日期范围添加到请求参数中，后端只需返回该范围内的事件。每当用户更改日期范围时，调度器会获取相应的数据片段。

要在客户端启用动态加载，可使用 *setLoadMode* 选项，值可以为:"day"、"week" 或 "month"。通常推荐使用 "day"。

首先，在客户端通过 [setLoadMode](api/method/setloadmode.md) 方法启用动态加载:

~~~js title="public/index.html"
scheduler.config.load_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2022, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/
 
// 从后端加载数据
scheduler.load("/events");
~~~

调度器会在请求查询中发送 `from` 和 `to` 参数，因此你可以在查询中添加简单的 `WHERE` 子句，只加载请求的日期范围:

~~~js title="storage.js"
async getAll(params) {
    let query = "SELECT * FROM ??";
    let queryParams = [
        this.table
    ];

    if (params.from && params.to) { /*!*/
        query += " WHERE `end_date` >= ? AND `start_date` < ?";
        queryParams.push(params.from);
        queryParams.push(params.to);
    }

    let result = await this._db.query(query, queryParams);

    result.forEach((entry) => {
    // 格式化日期和时间
        entry.start_date = entry.start_date.format("YYYY-MM-DD hh:mm");
        entry.end_date = entry.end_date.format("YYYY-MM-DD hh:mm");
    });
    return result;
}
~~~

## 重复事件

如需支持[重复事件](guides/recurring-events.md)（如"每日重复事件"），还需完成一些额外步骤。

### 启用扩展

在调度器页面激活重复事件扩展:

~~~js title="public/index.html"
<!-- scheduler recurring tasks extension -->
scheduler.plugins({
    recurring: true
});
~~~

### 更新数据模型

接下来，通过添加三个额外字段来更新数据模型:

- event_pid
- event_length
- rec_type

你可以通过以下 SQL 命令为现有 events 表添加这些列:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '""';
~~~

或者，也可以通过以下命令从头创建表:

~~~
CREATE TABLE `events` (
 `id` bigint(20) unsigned AUTO_INCREMENT,
 `start_date` datetime NOT NULL,
 `end_date` datetime NOT NULL,
 `text` varchar(255) DEFAULT NULL,
 `event_pid` bigint(20) unsigned DEFAULT '0',
 `event_length` bigint(20) unsigned DEFAULT '0',
 `rec_type` varchar(25) DEFAULT '""',
 PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

### 更新后端

最后，更新 [storage methods](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries) 以支持重复事件。

首先，更新 `insert` 方法，在 SQL 查询中包含新列。

另外，处理删除重复系列中单个事件的特殊情况，此时客户端会调用 *insert* 动作:

~~~js title="storage.js"
// 创建新事件
async insert(data) {
   let sql = "INSERT INTO ?? " +
      "(`start_date`, `end_date`, `text`, `event_pid`, `event_length`, `rec_type`) " + /*!*/
      "VALUES (?, ?, ?, ?, ?, ?)"; /*!*/

   const result = await this._db.query(
      sql,
      [
         this.table,
         data.start_date,
         data.end_date,
         data.text,
         data.event_pid || 0, //!
         data.event_length || 0, //!
         data.rec_type //!
      ]);

   // 从重复系列中删除单个事件
   let action = "inserted"; /*!*/
   if (data.rec_type == "none") { /*!*/
     action = "deleted"; /*!*/
   } /*!*/

   return {
     action: action,
     tid: result.insertId
   };
}
~~~

`update` 方法也需要对 SQL 查询做类似的调整。

此外，当修改重复系列时，应删除该系列所有已修改的事件:

~~~js title="storage.js"
// 更新事件
async update(id, data) {
  if (data.rec_type && data.rec_type != "none") { /*!*/
      // 更新重复系列时，需删除所有已修改的事件
      // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
      await this._db.query(
        "DELETE FROM ?? WHERE `event_pid`= ?;",
        [this.table, id]);
  }

  await this._db.query(
      "UPDATE ?? SET " +
      "`start_date` = ?, `end_date` = ?, `text` = ?, " +
      "`event_pid` = ?, `event_length`= ?, `rec_type` = ? "+ /*!*/
      "WHERE id = ?",
      [
          this.table,
          data.start_date,
          data.end_date,
          data.text,
          data.event_pid || 0, /*!*/
          data.event_length || 0, /*!*/
          data.rec_type, /*!*/
          id
      ]);

  return {
     action: "updated"
  };
}
~~~

最后，更新 `delete` 方法以处理两种特殊情况:

- 如果要删除的事件的 `event_pid` 非空，说明是要删除重复系列中的已修改事件。此时不要直接删除记录，而是将 `rec_type='none'`，这样调度器会跳过该事件。
- 如果要删除整个重复系列，还需删除该系列所有已修改的事件。

~~~js title="storage.js"
// 删除事件
async delete(id) {
    // 针对重复事件的特殊逻辑
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    let event = await this._db.query(
        "SELECT * FROM ?? WHERE id="?" LIMIT 1;",
        [this.table, id]);

    if (event.event_pid) {
        // 删除重复系列中的已修改事件
        // 不直接删除，而是将 rec_type 更新为 "none"
        event.rec_type = "none";
        return await this.update(id, event);
    }

    if (event.rec_type && event.rec_type != "none") {
        // 删除整个重复系列，同时移除所有已修改事件
        await this._db.query(
            "DELETE FROM ?? WHERE `event_pid`=? ;",
            [this.table, id]);
    }

    await this._db.query(
        "DELETE FROM ?? WHERE `id`= ?;",
        [this.table, id]);

    return {
        action: "deleted"
    }
}
~~~

## 应用安全

dhtmlxScheduler 是一个注重灵活性的客户端组件，不包含内置的安全特性。由于仅靠客户端代码无法提供可靠安全性，因此后端开发者需负责应用的安全。

需要考虑的关键点包括:

- SQL 注入:本示例使用参数化 SQL 查询，有助于防止 SQL 注入攻击。

- XSS 攻击:客户端不会在将用户输入发送到后端前进行过滤，服务器返回的数据在显示前也未经过过滤。

一个简单的风险缓解措施是使用 [`helmet`](https://github.com/helmetjs/helmet) 模块，它能添加基础的安全头。

通过如下命令安装 *helmet*:

~~~
$ yarn install helmet
~~~

然后在 *server.js* 中 `app.listen(...)` 之前添加如下代码:

~~~js title="server.js"
const helmet = require("helmet");
app.use(helmet());
~~~

## 错误处理

由于采用了 `router` 设置，后端 API 在捕获到异常时会返回 `error` 状态。

在客户端，你可以使用 dataProcessor 的 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 事件来处理这些错误:

~~~js title="public/index.html"
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
   if (action == "error") {
       // 在此处理错误
        alert("Server error: " + response.message);
   }
});
~~~

## 故障排查

如果你已按步骤将 Scheduler 集成到 Node.js，但页面上未显示事件，请参考 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章，其中提供了识别和解决常见问题的方法。

## 后续步骤

至此，你已拥有一个完整可用的 Scheduler。完整代码可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-node) 获取，欢迎克隆或下载，用于你的项目。

你还可以继续阅读 [Scheduler 丰富功能的指南](/guides/) 或关于 [与其他后端框架集成的教程](/integrations/howtostart-guides/)。

