---
title: "加载数据"
sidebar_label: "加载数据"
---

# 加载数据

dhtmlxScheduler 支持三种数据格式的加载:

1. JSON；
2. XML；
3. ICal。

[데이터 포맷 예시](guides/data-formats.md)

## 从内联数据集加载数据 {#loadingdatafromaninlinedataset}

要直接从内联数据集加载数据，可以使用 [parse](api/method/parse.md) 方法:

~~~js
scheduler.init('scheduler_here',new Date(2009,10,1),"month");
...
scheduler.parse([
    {text:"Meeting",    start_date:"2019-04-11 14:00", end_date:"2019-04-11 17:00"},
    {text:"Conference", start_date:"2019-04-15 12:00", end_date:"2019-04-18 19:00"},
    {text:"Interview",  start_date:"2019-04-24 09:00", end_date:"2019-04-24 10:00"}
],"json");
~~~


[Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)


## 从数据文件加载数据 {#loadingdatafromadatafile}

要从外部文件加载数据，可以使用 [load](api/method/load.md) 方法:

~~~js
scheduler.init('scheduler_here',new Date(2018,10,1),"month");
...
scheduler.load("data.json"); //从文件加载数据
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## 从数据库加载数据 {#loadingdatafromadatabase}

有两种方式可以从数据库加载数据。两者都需要处理客户端和服务端。

1) 第一种方式是通过 REST API 与服务器通信。

- 服务端的实现取决于所选用的框架。
例如，对于 Node.js，需要为 Scheduler 发送 AJAX 请求的 URL 添加一个服务器路由。

该路由会生成一个 JSON 响应。

~~~js
app.get('/data', function(req, res){
    db.event.find().toArray(function(err, data){
        //为所有记录设置 id 属性
        for (var i = 0; i < data.length; i++)
            data[i].id = data[i]._id;
        
        //输出响应
        res.send(data);
    });
});
~~~

- 在客户端，使用 [load](api/method/load.md) 方法并指定 Scheduler 请求数据的 URL:

~~~js title="Loading from a database. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("apiUrl");
~~~

:::note
关于与 REST API 服务端集成的更多详细信息，请参见文章 [Server-Side Integration](guides/server-integration.md)。
:::

2) 第二种方式是使用 [PHP Connector](https://docs.dhtmlx.com/connector__php__index.html) 从数据库表加载数据。

- 在服务端，实现一个返回 XML 或 JSON 格式数据的脚本:
  
~~~js title="Static loading from db. Server-side code"
include ('dhtmlxConnector/codebase/scheduler_connector.php');
 
$res="mysql_connect(""localhost","root","");
mysql_select_db("sampleDB");
 
$calendar = new SchedulerConnector($res);
$calendar->render_table("events","id","event_start,event_end,text","type");
~~~

- 在客户端，使用 [load](api/method/load.md) 方法并指定服务端脚本的路径:
  
~~~js title="Static loading from db. Client-side code"
scheduler.init('scheduler_here', new Date(), "month");
scheduler.load("events.php");
~~~

:::note
更多细节请参考 [dhtmlxScheduler와 dhtmlxConnector 연동하기](integrations/other/howtostart-connector.md) 指南。
:::

## 从多个源加载数据 {#loadingdatafrommultiplesources}

如需从多个源加载数据，可以使用 **multisource** 扩展:

~~~js
scheduler.plugins({
   multisource: true
});
~~~

:::note
多数据源可用于静态和动态加载
:::

引入相关文件后，[load](api/method/load.md) 方法可以接受一个源数组:

~~~js
scheduler.load(["first/source/some","second/source/other"]);
~~~

## 数据属性 {#dataproperties}

### 必需属性

数据项至少需要以下三个属性才能被正确解析:

- **start_date** -  (*string*) 事件的开始时间；
- **end_date** - (*string*) 事件的结束时间；
- **text** - (*string*) 事件描述。

从数据库加载时，还需要一个额外的必需属性:

- **id** -  (*string, number*) 事件标识符。

默认情况下，JSON 和 XML 数据使用日期格式 **'%Y-%m-%d %H:%i'** （参见 [日期格式规范](guides/settings-format.md)）。

 如需修改，可使用 [date_format](api/config/date_format.md) 选项。

~~~js
scheduler.config.date_format="%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here', new Date(2019, 3, 18), "week");
~~~

### 自定义属性

除了必需字段外，数据项还可以包含自定义属性。这些额外属性会被作为字符串解析，并可在客户端按需使用。

带有自定义属性的数据示例可在 [这里](guides/data-formats.md#datawithcustomproperties) 查看。

## 数据库结构 {#databasestructure}

为调度事件建立数据库时，建议的结构如下:

- **events 表** - 存储调度事件
    - **id** - (*string/int/guid*) - 事件标识符。主键，自增。
    - **start_date** - (*DateTime*) - 事件开始时间，不能为空。
    - **end_date** - (*DateTime*) - 事件结束时间，不能为空。
    - **text** - (*string*) - 事件描述。

对于循环事件，还需要附加列:

- **events 表** - 存储调度事件
    - **id** - (*string/int/guid*) - 事件标识符。主键，自增。
    - **start_date** - (*DateTime*) - 事件开始时间，不能为空。
    - **end_date** - (*DateTime*) - 事件结束时间，不能为空。
    - **text** - (*string*) - 事件描述。
    - **event_pid** - (*string/int/guid*) - 父事件系列 id 的引用。可为空或默认为空（空字符串、零）。
    - **event_length** - (*string/bigint*) - 事件持续时间或已修改发生的时间戳。可为空或默认为空（空字符串、零）。最大长度（字符串）为 10。
    - **rec_type** - (*string*) - 循环规则。可为空或默认为空字符串。最大长度为 50。

可根据需要添加更多列，这些列将在客户端 API 可访问。

## 动态加载 {#dynamic-loading}

默认情况下，dhtmlxScheduler 会一次性加载所有数据，对于大型数据集效率较低。动态加载允许分批加载数据，仅限于当前可见区域。

### 技术实现

通过调用 [setLoadMode](api/method/setloadmode.md) 方法启用动态加载:
~~~js title="Enabling the dynamic loading"
scheduler.setLoadMode("month");
scheduler.load("some.php");
~~~

该方法接受一个加载模式，用于确定要加载的数据范围:*day, week, month,* 或 *year*。

例如，设置为 'week' 模式后，调度器只会请求当前周的数据，并根据需要加载更多数据。


#### 加载模式的工作方式

加载模式定义了为所选周期加载数据的区间。例如，打开 2018-01-29 到 2018-02-05 的周视图:

- "day" 模式

~~~js
scheduler.setLoadMode("day");
~~~

调度器按天请求数据，如从 2018-01-29 到 2018-02-05。

- "month" 模式

~~~js
scheduler.setLoadMode("month");
~~~

调度器按整月请求数据，如从 2018-01-01 到 2018-03-01。

- "year" 模式

~~~js
scheduler.setLoadMode("year");
~~~

调度器按整年请求数据，如从 2018-01-01 到 2019-01-01。

请求的区间总是至少覆盖当前显示的区间。

加载区间会影响:

- 动态加载调用的频率

区间越大，加载调用的频率越低，因为已加载的数据会被缓存。

- 每次请求所需的时间

区间越大，每次请求的数据越多，处理时间也越长。

#### 请求格式

请求格式如下:

~~~js
some.php?from=DATEHERE&to=DATEHERE
~~~

*其中 DATEHERE 是由 [load_date](api/config/load_date.md) 选项指定格式的有效日期。* 


如果服务端采用 <a href="https://docs.dhtmlx.com/connector__php__index.html">dhtmlxConnector</a>，则无需额外处理即可解析这些请求。

### 加载进度指示（加载动画）

处理大量数据时，显示加载动画有助于提示进度。

可通过设置 [show_loading](api/config/show_loading.md) 属性为 *true* 启用加载动画:

~~~js
scheduler.config.show_loading = true;
...
scheduler.init('scheduler_here',new Date(2018,0,10),"month");
~~~

:::note
如需自定义加载动画图片，请将 'imgs/loading.gif' 替换为自定义图片。
:::

## 从服务端加载 Timeline 和 Units 区段数据 {#loadingdatawithtimelineandunitssectionsfromtheserver}

将数据加载到 [Timeline](views/timeline.md#dataloading) 和 [Units](views/units.md#loadingdatatotheview) 视图时，需要提供区段数组。

如需从后端加载 Timeline 和 Units 区段，需要更详细的设置:

- 在初始化 Timeline 视图时，不直接传递 sections 数组，而是使用 [serverList](api/method/serverlist.md) 方法和集合名称:

~~~js
scheduler.createTimelineView({
   ....
   y_unit: scheduler.serverList("sections"),
   ...
});
~~~

- 使用 [load](api/method/load.md) 方法将数据加载到调度器:

~~~js
scheduler.load("data.json");
~~~

- 服务端返回的数据结构应如下所示:

~~~js title=""data.json""
{ 
   "data":[
      {
          "id":"1",
          "start_date":"2018-03-02 00:00:00",
          "end_date":"2018-03-04 00:00:00",
          "text":"dblclick me!",
          "type":"1"
      },
      {
          "id":"2",
          "start_date":"2018-03-09 00:00:00",
          "end_date":"2018-03-11 00:00:00",
          "text":"and me!",
          "type":"2"
      },
      {
          "id":"3",
          "start_date":"2018-03-16 00:00:00",
          "end_date":"2018-03-18 00:00:00",
          "text":"and me too!",
          "type":"3"
      },
      { 
          "id":"4",
          "start_date":"2018-03-02 08:00:00",
          "end_date":"2018-03-02 14:10:00",
          "text":"Type 2 event",
          "type":"2"
      }
   ], 
   "collections": {
      "sections":[
         {"value":"1","label":"Simple"},
         {"value":"2","label":"Complex"},
         {"value":"3","label":"Unknown"}
      ]
   }
}
~~~

在此示例中，"data" 数组包含日历事件，"collections" 对象包含通过 [serverList](api/method/serverlist.md) 方法引用的集合。
