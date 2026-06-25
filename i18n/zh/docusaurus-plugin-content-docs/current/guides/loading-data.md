---
title: "加载数据"
sidebar_label: "加载数据"
---

# 加载数据

dhtmlxScheduler 可以以多种格式加载数据。大多数应用使用 **JSON**。用于兼容性或导入场景，也支持 **iCalendar (.ics)** 和 **XML**。

### 相关指南

- [- 数据格式总览](guides/data-formats.md)


## 从内联数据集加载数据

要从内联数据集加载数据，请使用 [`parse()`](api/method/parse.md) 方法：

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.parse([
    { id: "1", text: "Meeting", start_date: "2027-05-11 14:00", end_date: "2027-05-11 17:00" },
    { id: "2", text: "Conference", start_date: "2027-05-15 12:00", end_date: "2027-05-18 19:00" },
    { id: "3", text: "Interview", start_date: "2027-05-24 09:00", end_date: "2027-05-24 10:00" }
]);
~~~

### 相关示例

- [- 将事件显示为级联](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### 相关 API

- [`parse()`](api/method/parse.md)

### 相关指南

- [- 数据格式](guides/data-formats.md)


## 从数据文件加载数据

要从文件加载数据，请使用 [`load()`](api/method/load.md) 方法：

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
...
scheduler.load("data.json"); //从文件加载数据
~~~


### 相关示例

- [- 基本初始化](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### 相关 API

- [`load()`](api/method/load.md)

### 相关指南

- [- 数据格式](guides/data-formats.md)


## 从后端加载数据

通过暴露返回 Scheduler 事件 JSON 格式的 REST 端点来从后端加载数据。

- 服务器端实现取决于您的技术栈。例如，在 Node.js 中，您可以添加一个返回事件数据的路由：

~~~js
app.get("/data", async (request, response) => {
    const events = await db.event.find().toArray();
    response.json(events);
});
~~~

- 在客户端，使用带数据 URL 的 [`load()`](api/method/load.md) 调用：

~~~js
scheduler.init("scheduler_here", new Date(2027, 4, 1), "month");
scheduler.load("/data");
~~~

:::note
要将修改保存回服务器，请使用 [`createDataProcessor()`](api/method/createdataprocessor.md)。请参阅 [服务器端集成](guides/server-integration.md)。
:::

### 相关 API

- [`createDataProcessor()`](api/method/createdataprocessor.md)

### 相关指南

- [服务器端集成](guides/server-integration.md)


## 从多个来源加载数据

要从多个来源加载数据，在调用 [`parse()`](api/method/parse.md) 之前，请请求所需的端点并合并结果：

~~~js
Promise.all([
    fetch("/api/events").then((response) => response.json()),
    fetch("/api/holidays").then((response) => response.json())
]).then(([events, holidays]) => {
    scheduler.parse([...events, ...holidays]);
});
~~~

### 相关 API

- [`parse()`](api/method/parse.md)

### 相关指南

- [- 数据格式](guides/data-formats.md)


## 数据属性

### 必填属性

为使其被正确解析，每个事件必须包含以下属性：

- **id** - (*string|number*) 一个唯一的事件 id
- **start_date** - (*date|string*) 事件的开始日期
- **end_date** - (*date|string*) 事件的结束日期
- **text** - (*string*) 事件标题/描述

JSON 和 XML 数据的默认日期格式为 **'%Y-%m-%d %H:%i'**（参见 [日期格式规范](guides/settings-format.md)）

要更改它，请使用 [`date_format`](api/config/date_format.md) 配置选项。

~~~js
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init("scheduler_here", new Date(2027, 4, 18), "week");
~~~

### 自定义属性

您不受上述必填属性的限制，可以向数据项添加任何自定义属性。
额外的数据属性将被解析为字符串并加载到客户端，您可以根据需要使用它们。

有关具有自定义属性的数据示例，请参见 [数据格式](guides/data-formats.md)

### 相关 API

- [`date_format`](api/config/date_format.md)

### 相关指南

- [事件对象](guides/event-object-operations.md)


## 数据库结构

当您设置数据库时，调度事件的期望结构如下：

- **events table** - 指定调度器事件
- **id** - (*string/int/guid*) 事件 id。主键，自动增量
- **start_date** - (*DateTime*) 事件的开始日期，不可为空
- **end_date** - (*DateTime*) 事件的结束日期，不可为空
- **text** - (*string*) 任务的描述

如果您有重复事件，请添加以下字段：

- **rrule** - (*string*) RFC-5545 格式的重复规则
- **duration** - (*number*) 每次出现的持续时间（以秒为单位）
- **recurring_event_id** - (*string/int/guid*) 修改/删除发生的父系列 id
- **original_start** - (*DateTime*) 编辑/删除发生的原始开始日期
- **deleted** - (*boolean*) 标记已删除的发生

您可以定义任意其他列，它们可以加载到客户端并供客户端 API 使用。

### 相关指南

- [重复事件](guides/recurring-events.md)


## 动态加载

默认情况下，dhtmlxScheduler 会一次性加载所有数据。当您使用大型事件集合时，可能会带来问题。  
在这种情况下，您可以使用动态加载模式并按部分加载数据，以填充调度器当前可见区域所需。

### 技巧

要启用动态加载，请调用 [`setLoadMode()`](api/method/setloadmode.md) 方法：

~~~js
scheduler.setLoadMode("month");
scheduler.load("/api/events");
~~~

作为参数，该方法接受定义要加载的数据大小的加载模式：*day、week、month 或 year*。  

例如，如果您设置 'week' 模式，调度器将仅请求当前周的数据，并在需要时加载其余数据。

#### 加载模式的工作原理

预定义的加载模式指定在设定时间段内加载数据的区间。例如，您在调度器中打开周视图，日期范围为：从 2027-02-02 到 2027-02-09。  
根据所选模式，动态加载将按如下方式进行：

- 对于 "day" 模式

~~~js
scheduler.setLoadMode("day");
~~~

调度器将按天请求数据，即：从 2027-02-02 到 2027-02-09。

- 对于 "month" 模式

~~~js
scheduler.setLoadMode("month");
~~~

调度器将按整月请求数据，即：从 2027-02-01 到 2027-03-01。

- 对于 "year" 模式

~~~js
scheduler.setLoadMode("year");
~~~

调度器将按整年请求数据，即：从 2027-01-01 到 2028-01-01。

在任何情况下，请求的区间都不会小于渲染的区间。

加载区间定义了：

- 动态加载调用的频率

区间越大，动态加载调用的频率越低。调度器会在内存中保留已加载的数据部分，不会对其重复发出请求。

- 处理单个请求的持续时间

区间越大，单个请求处理的时间越长，因为一次加载的数据越多。

#### 请求

生成的请求如下所示：

~~~js
/api/events?from=DATEHERE&to=DATEHERE
~~~

*其中 DATEHERE 是一个有效日期值，格式由 [`load_date`](api/config/load_date.md) 选项定义。*  

### 相关 API

- [`setLoadMode()`](api/method/setloadmode.md)
- [`load_date`](api/config/load_date.md)

### 加载指示器

当处理大量数据时，显示加载指示器很有用。它会向用户表明应用程序确实在运行。  

要为调度器启用加载指示器，请将 [`show_loading`](api/config/show_loading.md) 属性设置为 *true*。  

~~~js
scheduler.config.show_loading = true;
...
scheduler.init("scheduler_here", new Date(2027, 4, 10), "month");
~~~

:::note
要更改加载指示器图片，请用自定义图片替换 'imgs/loading.gif'。
:::

## 通过服务器加载 Timeline 和 Units 部分数据 {#collections}

在向 [Timeline](views/timeline.md) 和 [Units](views/units.md) 视图加载数据时，您需要设置一个将被加载到视图中的 sections 数组。

为了从后端加载包含 Timeline 和 Units 部分的数据，您需要实现更扩展的配置：

- 在 Timeline 视图初始化期间，不再使用 sections 数组，而应使用 [`serverList()`](api/method/serverlist.md) 方法，并将集合名称作为参数传递：

~~~js
scheduler.createTimelineView({
    ....
    y_unit: scheduler.serverList("sections"),
    ...
});
~~~

- 要将数据加载到调度器，请使用 [`load()`](api/method/load.md) 方法：

~~~js
scheduler.load("data.json");
~~~

如果您手动获取数据（例如添加头信息），可以将相同的有效负载传递给 [`parse()`](api/method/parse.md)：

~~~js
fetch("/api/timeline")
    .then((response) => response.json())
    .then((payload) => scheduler.parse(payload, "json"));
~~~

- 在后端实现调度器数据响应时，请使用以下格式：

~~~js title="data.json"
{
    "data":[
        {
            "id":"1",
            "start_date":"2027-03-02 00:00:00",
            "end_date":"2027-03-04 00:00:00",
            "text":"dblclick me!",
            "type":"1"
        },
        {
            "id":"2",
            "start_date":"2027-03-09 00:00:00",
            "end_date":"2027-03-11 00:00:00",
            "text":"and me!",
            "type":"2"
        },
        {
            "id":"3",
            "start_date":"2027-03-16 00:00:00",
            "end_date":"2027-03-18 00:00:00",
            "text":"and me too!",
            "type":"3"
        },
        {
            "id":"4",
            "start_date":"2027-03-02 08:00:00",
            "end_date":"2027-03-02 14:10:00",
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

在上述示例中，"data" 数组包含日历事件，"collections" 哈希包含可通过 [`serverList()`](api/method/serverlist.md) 方法引用的集合。

### 相关 API

- [`serverList()`](api/method/serverlist.md)

### 相关指南

- [Timeline 视图](views/timeline.md)
- [单位视图](views/units.md)