---
title: "dhtmlxScheduler 与 PHP:Slim"
sidebar_label: "dhtmlxScheduler 与 PHP:Slim"
---

# dhtmlxScheduler 与 PHP:Slim

本教程为您提供了使用 Slim 4 框架结合服务器端 REST API 构建基于 PHP 的 Scheduler 的基本步骤。

:::note
本教程使用 Slim Framework v4.x。
如果您正在使用较早的版本，请参考 [Slim Framework v3.x](integrations/other/howtostart-php.md) 指南。
:::

此外，还有其他平台和框架集成的教程可供参考:

- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)

在开发 PHP 应用时，通常会采用现有框架，而不是从零开始搭建所有内容。

本指南将使用 [Slim 4](https://www.slimframework.com/) 框架以及服务器端的 REST API，数据存储采用 MySQL。CRUD 操作通过 PDO 实现，并设计为可灵活应用于其他框架。

[现成的演示已在 GitHub 提供](https://github.com/DHTMLX/scheduler-howto-php-slim) 供您参考。请按照以下步骤创建类似的应用。

:::note
完整源码可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) 获取。
:::

## 步骤 1. 初始化项目

### 创建项目

首先，使用 Slim 4 框架的 [skeleton application](https://github.com/slimphp/Slim-Skeleton)。

通过 Composer 创建应用:

~~~php
$ composer create-project slim/slim-skeleton scheduler-slim-howto
$ cd scheduler-slim-howto/
~~~

## 步骤 2. 在页面中添加 Scheduler

下一步是在网页中放置一个 scheduler，主要分为两个简单的小步骤。

### 创建视图

在 `app/templates` 目录下创建一个 *basic.html* 文件:

~~~js title="app/templates/basic.html"
<!doctype html>
<html>
  <head>
    <title> Getting started with dhtmlxScheduler</title>
      <meta charset="utf-8">
       <script src="https://cdn.dhtmlx.com/scheduler/edge/dhtmlxscheduler.js"></script>
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
            scheduler.config.xml_date="%Y-%m-%d %H:%i";
            scheduler.init('scheduler_here', new Date(2019,0,20), "week");
            scheduler.load("/events");
 
            var dp = scheduler.createDataProcessor("/events");
            dp.init(scheduler);
            dp.setTransactionMode("REST"); // use to transfer data with REST
        </script> 
  </body> 
</html>
~~~

### 设置路由

新页面准备好后，需要通过浏览器访问。请在 **app/routes.php** 中添加一个路由:

~~~js title="app/routes.php"
$app->get('/', function (Request $request, Response $response) {
$payload = file_get_contents('../app/templates/basic.html');
$response->getBody()->write($payload);
return $response;
});
~~~

此时，运行应用即可在页面上看到 scheduler:

![Scheduler initialization](/img/php_init_slim4.png)

## 步骤 3. 准备数据库

scheduler 已经就位，接下来需要设置数据库并将其与应用连接。

### 创建数据库

可以使用您喜欢的 MySQL 客户端（如 phpMyAdmin）或命令行创建数据库。以下为创建数据库及日历事件表的 SQL:

~~~js
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

如需通过 MySQL 控制台导入，请将上述 SQL 保存为 *dump.sql* 文件并运行:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

然后，打开 *app/settings.php*，添加数据库设置数组，并根据实际情况修改为您的数据库信息:

~~~js title="app/settings.php"
'pdo' => [
    'engine' => 'mysql',
    'host' => 'localhost',
    'database' => 'scheduler',
    'username' => 'user',
    'password' => 'pass',
    'charset' => 'utf8',
    'collation' => 'utf8_unicode_ci',

    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => true,
    ],
]
~~~

接下来，更新 *app/dependencies.php*，将 PDO 实例注入到应用容器:

~~~js title="app/dependencies.php"
// Inject a new instance of PDO into the container
$containerBuilder->addDefinitions([
  PDO::class => function (ContainerInterface $container) {
    $config = $container->get('settings')['pdo'];
    $dsn = "{$config['engine']}:host="{$config["'host']};dbname="{$config["'database']};
        charset="{$config["'charset']}";
    $username = $config['username'];
    $password = $config['password'];
    return new PDO($dsn, $username, $password, $config['options']);
  },
]);
~~~

## 步骤 4. 加载数据

scheduler 已设置为从 "/events" 端点请求事件数据。现在需要为该路由添加处理器以提供实际数据。

由于 scheduler 需要多个处理器，这里使用 Slim 4 的 [route groups](https://www.slimframework.com/docs/v4/objects/routing.html#route-groups) 进行组织。

打开 *app/routes.php*，为 "/events" 添加一个带 GET 操作的分组:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $query = $db->prepare($queryText);
        $query->execute();
        $result = $query->fetchAll();
        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
});
~~~

只要数据库中有事件，它们就会显示在 scheduler 中。

### 动态加载

此时，scheduler 会在启动时加载所有事件记录。对于数据量较小的场景，这种方式没问题。但如果应用用于计划或预定且不会删除旧数据，数据量会逐渐增大，最终可能导致每次加载页面时都要请求大量数据。

动态加载可以避免这种情况，scheduler 会将当前显示的日期范围作为请求参数发送到服务器，服务器只返回相关的记录。每当用户切换可见日期范围时，scheduler 会获取新的数据子集。

在客户端启用动态加载，只需使用 *setLoadMode* 方法，参数可为 "day"、"week" 或 "month"。例如:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
scheduler.load("/events");
~~~

在服务器端，可以这样处理:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
        $group->get('',  function (Request $request, Response $response, array $args) {
            $db = $this->get('PDO');
            $queryText = 'SELECT * FROM `events`';
            $params = $request->getQueryParams(); /*!*/
            $queryParams = []; /*!*/
            if (isset($params['from']) && isset($params['to'])) { /*!*/
                $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;"; /*!*/
                $queryParams = [$params['from'], $params['to']]; /*!*/
            } /*!*/
            $query = $db->prepare($queryText);
            $query->execute($queryParams); /*!*/
            $result = $query->fetchAll();
            $payload = json_encode($result);

            $response->getBody()->write($payload);
            return $response->withHeader('Content-Type', 'application/json');
        });
});
~~~

## 步骤 5. 保存更改

### 实现后端处理程序

此时，调度器已经可以从后端获取数据。下一步是使其能够将更改保存回数据库。

客户端以 REST 模式运行，这意味着它会发送 POST、PUT 和 DELETE 请求来管理事件。 
[参考请求格式及调度器使用的所有路由](guides/server-integration.md#request-and-response-details)。

为此，您需要定义一个控制器来处理数据模型上的操作，设置相应的路由，并在客户端启用数据保存功能。

回到 *app/routes.php*，为 "/events" 组添加一个 POST 请求的处理程序。这将用于插入新事件:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text']
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => 'inserted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

:::note
当添加新任务时，其 ID 会通过响应对象的 `tid` 属性返回给客户端。  
响应的 JSON 还可以包含其他属性，客户端处理程序可以访问这些属性。
:::

同样，为 PUT 请求添加处理程序:

~~~php
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        $id
    ];

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

对于 DELETE 请求:

~~~php
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';
    
    $query = $db->prepare($queryText);
    $query->execute([$id]);
    
    $result = [
        'action' => 'deleted'
    ];
    
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### 启用客户端数据保存

最后，需配置客户端以与刚刚设置的 API 进行交互:

~~~js title="public/basic.phtml"

scheduler.config.xml_date="%Y-%m-%d %H:%i";
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// 从后端获取数据
scheduler.load("/events");
 
// 将更改发送回后端
var dp = scheduler.createDataProcessor("/events"); dp.init(scheduler); /*!*/ 
// 配置数据交换模式
dp.setTransactionMode("REST"); /*!*/
~~~

重启应用后，调度器即可创建、删除和更新事件，并且所有更改在页面刷新后会被保留。

![Scheduler CRUD](/img/php_crud_slim4.png)

## 循环事件

若需支持循环事件（如每日重复），请在调度器页面引入相应扩展:

~~~html
...
<body>
    ...
    <script>
        scheduler.plugins({
            recurring: true /*!*/
        });
        scheduler.config.xml_date="%Y-%m-%d %H:%i";
        scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
        ...
   </script> 
</body>
~~~

"events" 表需要额外的列来存储循环相关信息。以下 SQL 查询可创建支持循环事件的表:

~~~js
CREATE DATABASE  IF NOT EXISTS `scheduler`;
USE `scheduler`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `event_pid` int(11) DEFAULT 0,
  `event_length` bigint(20) unsigned DEFAULT 0,
  `rec_type` varchar(25) DEFAULT '',
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

或者，也可以按如下方式更新现有 events 表:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### 更新后端

接下来，按照[循环事件指南](guides/recurring-events.md#editingdeletingacertainoccurrenceintheseries)中描述，更新处理程序。

从 `POST` 路由开始，修改 SQL 查询以包含新列。

同时，需处理循环事件的特殊情况:当删除循环系列中的某个特定事件时，客户端会触发 *insert* 操作，创建一条新记录来表示该删除:

~~~js title="app/routes.php"
$group->post('', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $body = $request->getParsedBody();

    $queryText = 'INSERT INTO `events` SET
                `start_date`=?,
                `end_date`=?,
                `text`=?,
                `event_pid`=?, 
                `event_length`=?, 
                `rec_type`=?'; 
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],
        // 循环事件相关列
        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0, 
        $body['rec_type'] 
    ];

    // 处理循环系列中单个事件的删除
    $resultAction = 'inserted'; /*!*/
    if ($body['rec_type'] === "none") { /*!*/
        $resultAction = 'deleted'; /*!*/
    } /*!*/
    /*
    循环事件数据处理结束
    */

    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $result = [
        'tid' => $db->lastInsertId(),
        'action' => $resultAction
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

`PUT` 处理程序也需要对 SQL 查询做类似更新。  
另外，还需处理特殊情况:当修改循环系列时，必须删除该系列的所有已更改事件:

~~~js title="app/routes.php"
$group->put('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    parse_str(file_get_contents("php://input"), $body);
    $queryText = 'UPDATE `events` SET
            `start_date`=?,
            `end_date`=?,
            `text`=?,
            `event_pid`=?,
            `event_length`=?,
            `rec_type`=?
            WHERE `id`=?';
    $queryParams = [
        $body['start_date'],
        $body['end_date'],
        $body['text'],

        $body['event_pid'] ? $body['event_pid'] : 0,
        $body['event_length'] ? $body['event_length'] : 0,
        $body['rec_type'],/*!*/
        $id
    ];
    if ($body['rec_type'] && $body['rec_type'] != 'none') {
        // 更新循环系列时，需删除所有已修改的事件
        // 参见 https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
            $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
    }

    $query = $db->prepare($queryText);
    $query->execute($queryParams);

    $result = [
        'action' => 'updated'
    ];
    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

最后，`DELETE` 处理程序需考虑两种特殊情况:

- 如果要删除的事件有非空的 `event_pid`，说明它是循环系列的已修改实例。这时不应真正删除记录，而是将其 `rec_type` 更新为 `'none'`，这样调度器会跳过该事件。
- 若要删除整个循环系列，还需删除该系列的所有已修改实例。

~~~js title="app/routes.php"
$group->delete('/{id}', function (Request $request, Response $response, array $args) {
    $db = $this->get('PDO');
    $id = $request->getAttribute('route')->getArgument('id');
    // 循环事件相关逻辑
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = 'SELECT * FROM `recurring_events` WHERE id="?" LIMIT 1;';
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch(PDO::FETCH_ASSOC);

    if ($event['event_pid']) {
        // 删除循环系列的已修改实例
        // 不直接删除，而是将 rec_type 更新为 'none'，跳过该事件
        $subQueryText='UPDATE `recurring_events` SET `rec_type`='none' WHERE `id`=?;';
        $subQuery = $db->prepare($subQueryText);
        $query->execute($queryParams);

        $result = [
            'action' => 'deleted'
        ];

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    if ($event['rec_type'] && $event['rec_type'] != 'none') {/*!*/
        // 删除循环系列时，同时删除所有已修改的实例
        $subQueryText = 'DELETE FROM `recurring_events` WHERE `event_pid`=? ;';
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }

    /*
        循环事件数据处理结束
    */

    $queryText = 'DELETE FROM `events` WHERE `id`=? ;';

    $query = $db->prepare($queryText);
    $query->execute([$id]);

    $result = [
        'action' => 'deleted'
    ];

    $payload = json_encode($result);

    $response->getBody()->write($payload);
    return $response->withHeader('Content-Type', 'application/json');
});
~~~

### 解析重复系列

一个重复事件会作为一条记录保存在数据库中，Scheduler 可以在客户端进行拆分。 
如果需要在服务端获取每个事件的具体日期，可以使用一个辅助库来解析 dhtmlxScheduler 的重复事件（PHP 版本）。 


你可以在 [GitHub 上找到这个可直接使用的库](https://github.com/DHTMLX/scheduler-helper-php)。

## 应用安全

dhtmlxScheduler 在客户端运行，并未内置安全特性以保持灵活性。 
由于仅靠客户端代码无法保证可靠的安全性，后端开发者必须负责相关的安全措施。

需要注意的关键点包括:

- SQL 注入。示例中所有操作都使用了参数化 SQL 查询，有助于防止 SQL 注入漏洞。

- XSS 攻击。客户端不会在将用户输入发送到后端前进行过滤，服务器端数据在展示前也未经过处理。  
本示例未包含任何 XSS 过滤措施，因此如果你计划在项目中使用此示例，务必添加合适的过滤。

为防止潜在的 XSS 攻击，确保插入到 HTML 中的所有字符串都经过正确转义。 
在本示例中，只需在客户端加载事件时对事件的 "text" 属性进行转义即可:

~~~js title="app/routes.php"
$app->group('/events', function ($group) {
    $group->get('',  function (Request $request, Response $response, array $args) {
        $db = $this->get('PDO');
        $queryText = 'SELECT * FROM `events`';
        $params = $request->getQueryParams();
        $queryParams = [];
        if (isset($params['from']) && isset($params['to'])) {
            $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
            $queryParams = [$params['from'], $params['to']];
        }
        $query = $db->prepare($queryText);
        $query->execute($queryParams);
        $result = $query->fetchAll();

        // 转义不安全的文本
        foreach($result as $index=>$event){
            $result[$index]["text"] = htmlentities($event["text"]);
        }

        $payload = json_encode($result);

        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });
~~~

## 错误处理

如果后端操作失败，客户端期望收到一个指明该操作 "error" 状态的响应（[详见](guides/server-integration.md#errorhandling)）。

你可以通过自定义默认的 Error Handler 实现这一点。 
编辑 `src/Application/Handlers/HttpErrorHandler.php` 文件，并将以下代码段:

~~~js title="src/Application/Handlers/HttpErrorHandler.php"
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $error->setDescription($exception->getMessage());
}
~~~

替换为:

~~~php
if (
    !($exception instanceof HttpException)
    && ($exception instanceof Exception || $exception instanceof Throwable)
    && $this->displayErrorDetails
) {
    $encodedPayload = json_encode([
        'action' => 'error', 'message' => $exception->getMessage()
    ]);
    $response = $this->responseFactory->createResponse();
    $response->getBody()->write($encodedPayload);
    return $response->withHeader('Content-Type', 'application/json');
}
~~~

在客户端，可以通过 dataProcessor 的 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 事件捕获这些错误:

~~~php
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // 在这里处理错误
    }
});
~~~

## 故障排查

如果你已按照所有步骤将 Scheduler 与 PHP 集成，但页面上未显示事件，请参阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章。 
该文档将帮助你定位常见问题的根本原因。

## 接下来

此时，你已经拥有了一个完整可用的 Scheduler。 
完整代码可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-slim) 上查看、克隆或下载到你的项目中使用。

此外，你还可以进一步阅读 [涵盖 Scheduler 多种特性的指南](/guides/)，或关于 [将 Scheduler 集成到其他后端框架的教程](/integrations/howtostart-guides/)。

