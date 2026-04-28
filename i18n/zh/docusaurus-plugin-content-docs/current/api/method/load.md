---
sidebar_label: load
title: "load method"
description: "loads data to the scheduler from an external data source"
---

# load

### Description

@short: 从外部数据源将数据加载到调度器

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - 服务器端 URL（可能是静态文件，或输出数据为以下受支持格式之一的服务器端脚本）
- `callback` - (optional) *function* - 回调函数

### Example

~~~jsx
scheduler.load("data"); // 数据格式会自动检测
// 或者
scheduler.load("data", () => {
    alert("数据已成功加载");
});
~~~

### Related samples
- [基础初始化](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [从数据库加载数据](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

请注意，在动态加载的情况下，作为第二个参数传递的回调函数仅在初次加载数据时被调用。后续的数据块将稍后加载，因此回调函数将不再被调用。

如果您需要在每次向 Scheduler 加载数据时都调用回调函数，可以使用 [`onLoadEnd`](api/event/onloadend.md) 事件。

## Migration

在 v5.2 及更高版本中，Scheduler 会自动检测数据格式。

但在 v5.2 之前，该方法包含三个参数：

- `url` - (*string*) 服务器端 URL（可能是静态文件，或输出数据为 XML 的服务器端脚本）
- `type` - (*string*) (*'json', 'xml', 'ical'*) 数据类型。默认值为 *'xml'*
- `callback` - (*function*) 回调函数

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [数据格式示例](guides/data-formats.md)
- [加载数据](guides/loading-data.md)

### Change log
- 从版本5.2开始，移除了第二个 `type` 参数。
