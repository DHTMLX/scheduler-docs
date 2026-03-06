---
title: "dhtmlxScheduler 与 PHP 集成教程"
sidebar_label: "dhtmlxScheduler 与 PHP 集成教程"
---

# dhtmlxScheduler 与 PHP 集成教程

本教程为您提供了使用 PHP 构建 Scheduler（调度器）应用的所有核心步骤，无需依赖任何框架。

本示例采用 MySQL 作为数据存储，并通过 [PDO 接口](https://www.php.net/manual/en/ref.pdo-mysql.php) 访问数据库。您需要 PHP 5.4 或更高版本，并启用 [PDO_MYSQL](https://www.php.net/manual/en/ref.pdo-mysql.php) 扩展，以及安装 MySQL 或 MariaDB。

如果您想了解如何在其它平台或框架下进行服务端集成，可以参考以下教程:

- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)
- [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md)

您还可以访问 [GitHub 上的完整演示](https://github.com/DHTMLX/scheduler-howto-php-plain)，按照分步说明搭建应用。

:::note
完整源码可在 [GitHub 获取](https://github.com/DHTMLX/scheduler-howto-php-plain)。
:::

## 步骤 1. 创建项目

首先，为您的应用创建一个新的目录。

新建一个空文件夹，并命名为 `scheduler-howto-php-plain`。

## 步骤 2. 在页面中添加 Scheduler

接下来，创建一个页面来承载 scheduler。

在 `scheduler-howto-php-plain` 文件夹内，创建一个 `index.html` 文件，并添加以下内容:

~~~js title="scheduler-howto-php-plain/index.html"
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
        scheduler.init('scheduler_here', new Date(2019,0,20), "week");
        scheduler.load("data/api.php");
    </script> 
    </body> 
</html>
~~~

运行应用后，调度器将显示在页面上:

![Scheduler initialization](/img/php_plain.png)

## 步骤 3. 准备数据库

此时，scheduler 还是空的。下一步需要创建数据库并与应用连接。

### 创建数据库

您可以通过常用的 MySQL 客户端（如 phpMyAdmin），或使用命令行来创建数据库。使用以下 SQL 语句新建数据库和事件表:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET="utf8;"
~~~

如果用 MySQL 控制台操作，可以先将上述 SQL 保存为 *dump.sql* 文件，然后执行:

~~~
$ mysql -uuser -ppass scheduler < mysql_dump.sql
~~~

## 步骤 4. 加载数据

数据库准备好后，就可以加载数据到 scheduler 了。

在项目目录下新建一个名为 `data` 的文件夹。

首先，在 `data/config.php` 文件中定义数据库连接参数:

~~~js title="data/config.php"
<?php
$dsn = "mysql:host=localhost;dbname=scheduler_howto_php";
$username = "root";
$password = "";
 
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'",
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
);
~~~

请根据实际的数据库配置，修改 "localhost"、 "scheduler_howto_php"、 "root" 和 "" 为相应的值。

接下来，添加一个 PHP 脚本，客户端将通过它从数据库加载数据并保存 scheduler 的更改。

在 `data` 文件夹下创建 `api.php` 文件，首先建立数据库连接:

~~~js title="data/api.php"
<?php
require_once("config.php");
$db = new PDO($dsn, $username, $password, $options);
~~~

然后，实现一个函数用于从数据库读取 scheduler 事件:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

之后，创建请求处理器以响应前端请求:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST":
        // we'll implement this later
    break;
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
header("Content-Type: application/json");
echo json_encode($result);
~~~

如果您已经在数据库中添加了一些事件，它们现在会显示在 scheduler 上。

### 动态加载

目前，scheduler 会一次性从数据库加载所有事件记录。如果数据量较小，这种方式没问题。但对于如预订或计划等应用，旧数据会不断累积，数据量会越来越大。经过几个月的使用，每次加载页面都可能传输数兆字节的事件数据。

为避免这种情况，可以启用动态加载。scheduler 会将当前显示的日期范围作为参数发送，服务端只返回该范围内的事件。每次用户切换日期范围时，scheduler 只请求相关的数据。

要在客户端启用动态加载，使用 *setLoadMode* 选项，并设置为 "day"、"week" 或 "month"。例如，在客户端代码中添加:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day"); /*!*/

// load data from the backend
scheduler.load("data/api.php");
~~~

在服务端，可以通过如下方式调整 `read` 函数:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
 
    // handle dynamic loading
    if (isset($requestParams["from"]) && isset($requestParams["to"])) { /*!*/
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";  /*!*/
        $queryParams = [$requestParams["from"], $requestParams["to"]];  /*!*/
    }  /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll();
    return $events;
}
~~~

## 步骤 5. 保存更改

### 实现后端处理

目前，scheduler 已能从后端读取数据。下一步是支持将更改保存回数据库。

客户端以 JSON 模式工作，通过 POST 请求提交事件操作。关于请求格式和路由的详细信息，请参阅 [Server-Side Integration](guides/server-integration.md#request-and-response-details)。

为数据库中的事件添加创建、更新和删除功能。

在 `data/api.php` 中添加如下函数:

~~~js title="data/api.php"
// create a new event
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"]
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
// update an event
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?
        WHERE `id`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        $id
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
// delete an event
function delete($db, $id){
    $queryText = "DELETE FROM `events` WHERE `id`=? ;";
    $query = $db->prepare($queryText);
    $query->execute([$id]);
}
~~~

然后更新 POST 请求处理器，调用这些函数:

~~~js title="data/api.php"
$db = new PDO($dsn, $username, $password, $options);
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
        break;
    case "POST": /*!*/
        $requestPayload = json_decode(file_get_contents("php://input")); /*!*/
        $id = $requestPayload->id; /*!*/
        $action = $requestPayload->action; /*!*/
        $body = (array) $requestPayload->data; /*!*/
        $result = [ /*!*/
            "action" => $action /*!*/
        ]; /*!*/
        if ($action == "inserted") {; /*!*/
            $databaseId = create($db, $body); /*!*/
            $result["tid"] = $databaseId; /*!*/
        } elseif($action == "updated") { /*!*/
            update($db, $body, $id); /*!*/
        } elseif($action == "deleted") { /*!*/
            delete($db, $id); /*!*/
        } /*!*/
    break; /*!*/
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
 
header("Content-Type: application/json");
echo json_encode($result);
~~~

:::note
当创建新事件时，返回的响应 JSON 中的 **tid** 属性会包含数据库分配的 ID。响应 JSON 还可以包含其它属性，客户端可在处理时获取这些信息。
:::

### 在客户端启用数据保存

接下来，将设置客户端以配合我们刚刚创建的 API 工作:

~~~js title="index.html"
scheduler.init("scheduler_here", new Date(2019, 0, 20), "week");
scheduler.setLoadMode("day");
 
// 从后端加载数据
scheduler.load("data/api.php"); /*!*/
 
// 将更新发送到后端
var dp = scheduler.createDataProcessor({ /*!*/
    url: "data/api.php", /*!*/
    mode: "JSON" /*!*/
}); /*!*/
~~~

现在重启应用，将可以在调度器中创建、删除和修改事件，并且所有更改在刷新页面后都会被保留。

![Scheduler CRUD](/img/php_plain_crud.png)

此时，您已经拥有了一个基本的调度器，它将事件保存在 MySQL 数据库中。

## 循环事件

要启用循环事件（如"每日重复事件"），需要在调度器页面添加相应的扩展:

~~~html
...
<body>
    ...
    <script>
        scheduler.plugins({
            recurring: true /*!*/
        });
        scheduler.init('scheduler_here', new Date(2019,0,20), "week");
        ...
    </script> 
</body>
~~~

"events" 表需要增加额外的列来存储循环事件的信息。以下 SQL 查询用于创建支持循环事件的表:

~~~
CREATE DATABASE  IF NOT EXISTS `scheduler_howto_php`;
USE `scheduler_howto_php`;
 
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

或者，您也可以用以下语句对前一步的 events 表进行升级:

~~~
ALTER TABLE `events` ADD COLUMN `event_pid` int(11) DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `event_length` bigint(20) unsigned DEFAULT '0';
ALTER TABLE `events` ADD COLUMN `rec_type` varchar(25) DEFAULT '';
~~~

### 后端更新

PHP 脚本需要做一些调整。

首先，更新 `INSERT` 操作的 SQL 查询以包含新列。

接着，处理循环事件的特殊情况:删除循环系列中的单个事件时，需要新建一条记录，因此客户端会调用 *insert* 操作:

~~~js title="data/api.php"
function create($db, $event){
    $queryText = "INSERT INTO `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?,  /*!*/
        `event_length`=?,  /*!*/
        `rec_type`=?";  /*!*/
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        // 循环事件相关列
        $event["event_pid"] ? $event["event_pid"] : 0,  /*!*/
        $event["event_length"] ? $event["event_length"] : 0,  /*!*/
        $event["rec_type"]  /*!*/
    ];
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    return $db->lastInsertId();
}
~~~

`POST` 请求处理器也需要更新，因为客户端期望服务器在插入跳过的循环事件后返回 "deleted" 状态:

~~~js title="data/api.php"
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        $result = read($db, $_GET);
    break;
    case "POST":
        $requestPayload = json_decode(file_get_contents("php://input"));
        $id = $requestPayload->id;
        $action = $requestPayload->action;
        $body = (array) $requestPayload->data;
        $result = [
            "action" => $action
        ];
        if ($action == "inserted") {
            $databaseId = create($db, $body);
            $result["tid"] = $databaseId;
            // 删除循环系列中的单个事件
            if ($body["rec_type"] === "none") {
                $result["action"] = "deleted";/*!*/
            }
        } elseif($action == "updated") {
            update($db, $body, $id);
        } elseif($action == "deleted") {
            delete($db, $id);
        }
    break;
    default: 
        throw new Exception("Unexpected Method"); 
    break;
}
~~~

update 处理器的 SQL 查询也需要类似的更改。此外，修改循环系列时，必须删除该系列所有已修改的事件:

~~~js title="data/api.php"
function update($db, $event, $id){
    $queryText = "UPDATE `events` SET
        `start_date`=?,
        `end_date`=?,
        `text`=?,
        `event_pid`=?, /*!*/
        `event_length`=?, /*!*/
        `rec_type`=? /*!*/
        WHERE `id`=?";
    $queryParams = [
        $event["start_date"],
        $event["end_date"],
        $event["text"],
        $event["event_pid"] ? $event["event_pid"] : 0, /*!*/
        $event["event_length"] ? $event["event_length"] : 0, /*!*/
        $event["rec_type"], /*!*/
        $id
    ];
    if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
        // 更新循环系列时，必须删除所有已修改的事件 /*!*/
        //https://docs.dhtmlx.com/scheduler/ server_integration.html#recurringevents /*!*/
        $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;"; /*!*/
        $subQuery = $db->prepare($subQueryText); /*!*/
        $subQuery->execute([$id]); /*!*/
    } /*!*/
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
}
~~~

最后，`DELETE` 操作需要处理两种特殊情况:
  
- 如果事件的 `event_pid` 字段非空，表示正在删除循环系列的某个已修改实例。此时不应直接删除记录，而是将 `rec_type='none'`，这样调度器会跳过该事件。
  
- 删除整个循环系列时，也应删除该系列所有已修改的实例。

~~~js title="data/api.php"
function delete($db, $id){
    // 针对循环事件的特殊逻辑
    // https://docs.dhtmlx.com/scheduler/server_integration.html#recurringevents
    $subQueryText = "SELECT * FROM `events` WHERE id="?" LIMIT 1;";
    $subQuery = $db->prepare($subQueryText);
    $subQuery->execute([$id]);
    $event = $subQuery->fetch();
    if ($event["event_pid"]) {
        // 删除循环系列中的已修改实例
        // 如果 event_pid 不为空，则用 rec_type==none 更新，而不是直接删除
        $subQueryText="UPDATE `events` SET `rec_type`='none' WHERE `id`=?;";
        $subQuery = $db->prepare($subQueryText);
        $subQuery->execute([$id]);
    }else{
        if ($event["rec_type"] && $event["rec_type"] != "none") { /*!*/
            // 删除整个循环系列时，同时删除所有已修改的实例
            $subQueryText = "DELETE FROM `events` WHERE `event_pid`=? ;";
            $subQuery = $db->prepare($subQueryText);
            $subQuery->execute([$id]);
        }
        /*
        循环事件数据处理结束
        */
        $queryText = "DELETE FROM `events` WHERE `id`=? ;";
        $query = $db->prepare($queryText);
        $query->execute([$id]);
    }
}
~~~

## 应用安全性

dhtmlxScheduler 运行在客户端，为了保持灵活性本身并不包含安全机制。由于仅依赖客户端安全是不够的，后端开发者需负责应用的安全性。关键注意点包括:

- SQL 注入:本示例所有操作均采用参数化 SQL 查询，有助于防止 SQL 注入攻击。

- XSS 攻击:客户端不会在将用户输入发送到后端前进行过滤，也不会在显示服务端数据前进行过滤。本示例未包含任何 XSS 过滤，因此如计划在应用中使用此示例，务必添加过滤措施。

为防止 XSS 攻击，确保插入到 HTML 的所有字符串都已正确转义。

在本示例中，只需在将事件加载到客户端时转义事件的 *"text"* 属性即可:

~~~js title="data/api.php"
function read($db, $requestParams){
    $queryParams = [];
    $queryText = "SELECT * FROM `events`";
    if (isset($requestParams["from"]) && isset($requestParams["to"])) {
        $queryText .= " WHERE `end_date`>=? AND `start_date` < ?;";
        $queryParams = [$requestParams["from"], $requestParams["to"]];
    }
    $query = $db->prepare($queryText);
    $query->execute($queryParams);
    $events = $query->fetchAll(PDO::FETCH_ASSOC);
 
    // 转义不安全文本
    foreach($events as $index=>$event){
        $events[$index]["text"] = htmlentities($event["text"]);
    }
    return $events;
}
~~~

## 错误处理

当后端无法执行某操作时，客户端期望收到 "error" 状态的响应。

可以通过 try-catch 包裹方法调用实现。在 `data/app.php` 文件中，将 `switch-case` 块替换为如下内容:

~~~js title="data/api.php"
try {
    switch ($_SERVER["REQUEST_METHOD"]) {
        case "GET":
            $result = read($db, $_GET);
        break;
        case "POST":
            $requestPayload = json_decode(file_get_contents("php://input"));
            $id = $requestPayload->id;
            $action = $requestPayload->action;
            $body = (array) $requestPayload->data;
            $result = [
                "action" => $action
            ];
            if ($action == "inserted") {
                $databaseId = create($db, $body);
                $result["tid"] = $databaseId;
                // 删除循环系列中的单个事件
                if ($body["rec_type"] === "none") {
                    $result["action"] = "deleted";/*!*/
                }
            } elseif($action == "updated") {
                update($db, $body, $id);
            } elseif($action == "deleted") {
                delete($db, $id);
            }
        break;
        default: 
            throw new Exception("Unexpected Method"); 
        break;
    }
} catch (Exception $e) {
    http_response_code(500);
    $result = [
        "action" => "error",
        "message" => $e->getMessage()
    ];
}
~~~

在客户端，可以通过 dataProcessor 的 [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html) 事件捕获错误:

~~~js title="index.html"
dp.init(scheduler);
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
    if(action == "error"){
        // 此处可进行相应处理
    }
});
~~~

## 故障排除

如果在完成上述 PHP 集成步骤后调度器未能显示事件，请参阅 [백엔드 통합 문제 해결](guides/troubleshooting.md) 文章以获取排查指导。

## 后续步骤

现在，您已经拥有了一个完整可用的 Scheduler，可以在 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-plain) 上获取完整代码，克隆或下载以用于您的项目。

此外，您还可以查阅 [Scheduler 各项功能指南](/guides/) 或关于 [与其他后端框架集成的教程](/integrations/howtostart-guides/)。

