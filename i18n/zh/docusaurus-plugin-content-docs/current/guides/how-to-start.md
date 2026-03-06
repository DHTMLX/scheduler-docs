---
title: "如何开始"
sidebar_label: "如何开始"
---

# 如何开始

本教程将带您逐步创建一个基础的调度器，实现从数据库加载数据并保存回去的功能。 
这里的最终示例可以作为使用 dhtmlxScheduler 构建应用的坚实基础。

![init_scheduler_front.png](/img/init_scheduler_front.png)


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)


## 第一步:创建新的 HTML 文件并添加所需代码文件

首先，新建一个 HTML 文件，并引入调度器所需的脚本和样式文件。

您需要的文件有:

- *dhtmlxscheduler.js*
- *dhtmlxscheduler_material.css*（用于 Material 皮肤；您也可以[查看其它可用皮肤](guides/skins.md)）

~~~html
<!DOCTYPE html>
<html>
<head>
   <title>How to start</title>
   <script src="../scheduler/dhtmlxscheduler.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../scheduler/dhtmlxscheduler_material.css" 
           type="text/css">
</head>
<body>
       //your code will be here
</body>
</html>
~~~

让我们快速了解一下 dhtmlxScheduler 包的结构，以便找到这些文件的位置:

- <b>sources</b> - 源代码文件，未压缩，便于阅读，主要用于调试。
- <b>samples</b> - 示例代码片段。
- <b>docs</b> - 组件的完整文档。
- <b>codebase</b> - 为生产环境优化的压缩文件。<b>请在您的项目中使用此文件夹下的文件。</b>

## 第二步:定义相关的 DIV 元素

在初始化调度器之前，需要为其界面元素设置必要的 DIV 容器。

调度器所需的典型 'div' 结构如下:

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

## 第三步:样式设置

为了确保调度器在各浏览器中能正常全屏显示，请为调度器添加如下 CSS 样式:

~~~css
<style type="text/css" media="screen">
    html, body{
        margin:0px;
        padding:0px;
        height:100%;
        overflow:hidden;
    }   
</style>
~~~

如果您不使用全屏模式，则无需添加该样式。此时只需在主 **div** 上设置所需的 CSS 属性即可:

~~~html
<div id="scheduler_here" class="dhx_cal_container"/>
...
~~~

## 第四步:初始化

一切准备就绪后，即可初始化调度器。请注意，调度器是静态对象，每个页面只能初始化一次。 
您可以通过 **dhtmlxScheduler** 或 **scheduler** 来引用调度器实例。

~~~js
scheduler.init('scheduler_here', new Date(),"month");
~~~

## 第五步:加载数据

此时运行应用会显示调度器，但其中不会有任何事件。

要为其填充数据，可以先用一个简单的内联对象作为数据源。 
使用 [parse](api/method/parse.md) 方法从内联对象加载数据。

每个事件对象包含:

- **id** - (*string, number*) 事件标识符。
- **start_date** - (*string*) 事件开始日期，默认格式为 "%m/%d/%Y %H:%i"。
- **end_date** - (*string*) 事件结束日期，默认格式为 "%m/%d/%Y %H:%i"。
- **text** - (*string*) 事件描述。

~~~js
var events = [
   {id:1, text:"Meeting",   start_date:"04/11/2018 14:00",end_date:"04/11/2018 17:00"},
   {id:2, text:"Conference",start_date:"04/15/2018 12:00",end_date:"04/18/2018 19:00"},
   {id:3, text:"Interview", start_date:"04/24/2018 09:00",end_date:"04/24/2018 10:00"}
];

scheduler.parse(events); // 指定数据源及格式
~~~

您也可以[从服务器加载数据](#step7loadingdatafromtheserver)。

:::note
有关与服务器端集成的详细信息，请参见 [Server-Side Integration](guides/server-integration.md) 文章。
:::

## 第六步:数据库结构

:::note
如果您希望从数据库而不是内联对象加载数据，请按照以下步骤操作。
:::

如果您决定从服务器加载数据，则需要一个结构如下的数据库表:

![db_table](/img/db_table.png)

可以使用以下 SQL 代码创建:

~~~js
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `text` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)
~~~

除了这些字段外，您还可以根据需要添加额外的列，这些列可以发送到客户端并[映射到 lightbox](guides/custom-details-form.md)。

请注意，数据库中的日期时间格式为 '%Y-%m-%d %H:%i'，与调度器默认的 '%m/%d/%Y %H:%i' 不同。 
为确保正确处理，需要通过 [xml_date](api/config/xml_date.md) 选项更新调度器的日期格式。

请确保在初始化调度器前设置相关配置，如下所示:

~~~js
scheduler.config.xml_date="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(),"month");
~~~

## 第七步:从服务器加载数据

要从数据库加载数据，请使用 [load](api/method/load.md) 方法，并提供处理数据操作的服务器端脚本 URL。

:::note
[dhtmlxConnector](https://docs.dhtmlx.com/connector__php__index.html) 库可以帮助您快速开始，如下所示。但对于新项目，建议手动构建后端 API，以获得更高的灵活性。详情参见 [Server-Side Integration](guides/server-integration.md)。
:::
  
方法调用示例:

~~~js
// 指定处理 CRUD 操作的服务器端脚本 URL
scheduler.load("data/connector.php");
~~~

## 第八步:服务器端脚本

以下是一个 dhtmlxScheduler 的服务器端脚本示例:

~~~php
<?php 
require_once("../codebase/connector/scheduler_connector.php");
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("schedulerDB");

$conn = new SchedulerConnector($res);

$conn->render_table("events","id","start_date,end_date,text");
~~~

### 数据库列映射

请注意，**$connector->render_table** 中列的顺序很重要。前三个列分别对应客户端事件对象的 *start_date*、*end_date* 和 *text* 属性，无论实际的列名如何:

~~~js
$conn->render_table("events","EventId","Start,End,Name,details","");
// JS: event.id, event.start_date, event.end_date, event.text, event.text, event.details
~~~

#### 映射额外的列

任何额外的列都将根据其名称直接映射:

~~~js
$conn->render_table("events","id","start_date,end_date,text,custom,details","");
// JS: event.start_date, event.end_date, event.text, event.custom, event.details
~~~

您也可以使用别名:

~~~js
$conn->render_table("events","id",
    "start_date,end_date,text,custom_column(customProperty),details","");
// JS: event.start_date, event.end_date, event.text, event.customProperty, event.details
~~~

## 第九步:保存数据

此时，调度器已经可以从数据库加载数据，但还不能自动保存更改。 
要启用保存功能，请使用 <a href="https://docs.dhtmlx.com/dataprocessor__index.html">dataProcessor</a>。

dataProcessor 的使用非常简单，只需初始化并将其与调度器关联即可:

~~~js
var dp = scheduler.createDataProcessor("data/connector.php");
dp.init(scheduler);
~~~
  
到这里为止，您已经拥有了一个可以与数据库进行数据加载和保存的基础调度器。

接下来，您可以根据具体需求对其进行自定义和扩展。


[Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)
