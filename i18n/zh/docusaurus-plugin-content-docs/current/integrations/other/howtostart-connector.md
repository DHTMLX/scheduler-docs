---
title: "dhtmlxScheduler 与 dhtmlxConnector"
sidebar_label: "dhtmlxScheduler 与 dhtmlxConnector"
---

# dhtmlxScheduler 与 dhtmlxConnector

本教程将指导你创建一个基础的调度器（scheduler），它通过数据库加载和保存事件。 
这里的最终示例代码可以作为你使用 dhtmlxScheduler 构建应用程序的坚实基础。

本教程以 PHP 实现 Scheduler 的步骤为例。如果你更喜欢其他后端语言，可以参考以下相关指南:

- [dhtmlxScheduler와 Node.js](integrations/node/howtostart-nodejs.md)
- [dhtmlxScheduler와 ASP.NET Core](integrations/dotnet/howtostart-dotnet-core.md)
- [dhtmlxScheduler와 ASP.NET MVC](integrations/dotnet/howtostart-dotnet.md)
- [dhtmlxScheduler와 PHP](integrations/php/howtostart-plain-php.md)
- [dhtmlxScheduler와 PHP:Slim](integrations/php/howtostart-php-slim4.md)
- [dhtmlxScheduler와 PHP:Laravel 연동하기](integrations/php/howtostart-php-laravel.md)
- [dhtmlxScheduler와 SalesForce LWC 통합하기](integrations/salesforce/howtostart-salesforce.md)
- [dhtmlxScheduler와 Ruby on Rails 연동하기](integrations/other/howtostart-ruby.md)

请按照以下分步说明构建应用程序。

:::note
完整的源代码托管在 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector)。
:::

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## 步骤 1. 创建 HTML 文件并引入必要的代码文件

首先新建一个 HTML 文件，并添加所需的 scheduler 脚本和样式表。

需要引入的关键文件有:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler.css*

~~~js
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler.css" type="text/css">
</head>
<body>
       //your code will be here
</body>
</html>
~~~

让我们快速了解一下 dhtmlxScheduler 包的结构，看看这些文件位于哪里:

- <b>backend</b> - 包含一个 node.js 应用，用于运行包内示例。
- <b>samples</b> - 包含示例代码片段。
- <b>codebase</b> - 存放库的代码文件。*codebase/source* 文件夹下为未压缩版本。

## 步骤 2. 定义相关的 DIV 元素

在初始化调度器之前，需要设置调度器将要使用的 DIV 容器。

调度器通常需要的 div 结构如下:

~~~js
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
~~~

## 步骤 3. 样式设置

为了保证调度器在不同浏览器下全屏模式正常显示，可以应用如下样式:

~~~js
<style>
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

如果你不使用全屏模式，则无需此样式。你可以直接在主 **div** 上指定所需的 CSS:

~~~js
<div id="scheduler_here" class="dhx_cal_container">
...
~~~

## 步骤 4. 初始化

完成上述设置后，初始化调度器。注意，调度器在页面上是单例的--只能存在一个实例。

你可以通过 **dhtmlxScheduler** 或 **scheduler** 来引用调度器实例。

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## 步骤 5. 加载数据

此时如果运行应用，调度器会显示但没有任何事件。

要添加事件，可以先用简单的内联数据源。调度器可以通过 [parse](api/method/parse.md) 方法从内联对象加载数据。

每个事件对象应包含以下属性:

- **id** - (*string, number*) 事件的唯一标识符。
- **start_date** - (*string*) 事件开始时间，默认格式为 "%m/%d/%Y %H:%i"。
- **end_date** - (*string*) 事件结束时间，默认格式为 "%m/%d/%Y %H:%i"。
- **text** - (*string*) 事件描述。

~~~js
var events = [
{id:1, text:"Meeting",   start_date:"2019-11-14 14:00",end_date:"2019-11-14 17:00"},
{id:2, text:"Conference",start_date:"2019-11-13 12:00",end_date:"2019-11-13 19:00"},
{id:3, text:"Interview", start_date:"2019-11-14 09:00",end_date:"2019-11-14 10:00"}
];

scheduler.parse(events);//指定数据源及格式
~~~

## 步骤 6. 数据库结构
:::note
如果你计划从数据库加载数据而不是内联对象，请参考此步骤及后续步骤。
:::

如果你需要从服务器加载数据，首先需要创建如下数据库表:

![db_table](/img/db_table.png)

你可以使用以下 SQL 创建表:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

除以上字段外，你可以添加任何所需的扩展列，这些列可以发送给客户端并
[映射到调度器的 lightbox 表单](guides/custom-details-form.md)。

需要注意的是，数据库的 DateTime 格式为 '%Y-%m-%d %H:%i'，与调度器默认的 '%m/%d/%Y %H:%i' 不同。 
为正确处理日期格式，请通过 [date_format](api/config/date_format.md) 选项更新调度器的日期格式。

请确保在调用初始化方法前设置相关配置选项，例如:

~~~js
scheduler.init('scheduler_here',new Date(),"month");
~~~

## 步骤 7. 从服务器加载数据 {#step-7-loading-data-from-the-server}

要从数据库获取数据，请使用 [load](api/method/load.md) 方法，并传入你的后端脚本 URL。

你可以根据我们的 [指南](integrations/howtostart-guides.md) 自行构建后端，本教程则以 [PHP connector 库](https://docs.dhtmlx.com/connector__php__index.html) 为例，快速实现。

用法如下:

~~~js
// 传入处理 CRUD 操作的服务端脚本 URL
scheduler.load("data/connector.php");
~~~

## 步骤 8. 服务端脚本

从 https://github.com/DHTMLX/connector-php 下载 connector 库。

以下是 dhtmlxScheduler 的基础 PHP 服务端脚本示例:

~~~php
<?php 
require_once("./connector/scheduler_connector.php");

$res = new PDO("mysql:host=localhost;dbname=scheduler", "username", "password");

$connector = new SchedulerConnector($res);
$connector->render_table("events","id","start_date,end_date,text");
~~~


你可以自由命名数据库字段。调度器期望前 3 个数据字段分别为:

- 开始日期
- 结束日期
- 文本描述

例如，如果你的字段命名不同:

~~~php
$connector->render_table("events","id","event_start,event_end,event_text");
~~~

调度器将如下对应:

- *event_start* → *start_date*
- *event_end* → *end_date*
- *event_text* → *text*

:::note
你可以在 [Recurring Events](guides/recurring-events.md#server-side-integration) 指南中了解关于重复事件的内容。
:::

:::note
重复事件在数据库中作为单条记录存储，并由调度器在客户端进行扩展。
如果需要在服务端获取各次实例，请使用 PHP 辅助库解析重复事件。

该库可在 GitHub 获取:[scheduler-helper-php](https://github.com/DHTMLX/scheduler-helper-php)。
:::

## 步骤 9. 保存数据
此时，调度器已能从数据库加载事件，但还不能自动保存更改。

如需保存更改，可使用 [dataProcessor](guides/server-integration.md#technique)。

dataProcessor 的用法非常简单:只需初始化并绑定到调度器即可。

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~

就是这样。你现在已经拥有一个可以从数据库加载事件并保存更改的基础调度器了。

你可以根据需要进一步自定义和扩展。


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


完整可用的示例可在 [GitHub](https://github.com/DHTMLX/scheduler-howto-php-connector) 查看，你可以克隆或下载用于自己的项目。
