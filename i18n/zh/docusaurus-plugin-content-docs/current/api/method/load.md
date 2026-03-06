---
sidebar_label: "load"
title: "load method"
description: "从外部源加载数据到scheduler中"
---

# load

### Description

@short: 从外部源加载数据到scheduler中

@signature: load: (url: string, callback?: SchedulerCallback) =\> void

### Parameters

- `url` - (required) *string* - 服务器端URL（可以是静态文件或输出支持格式数据的服务器端脚本）
- `callback` - (optional) *function* - 加载完成后调用的函数

### Example

~~~jsx
scheduler.load("data"); // 数据格式会自动检测
// 或者
scheduler.load("data",function(){
    alert("数据已成功加载");
});
~~~

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Loading data from a database](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/05_loading_database.html)

### Details

请注意，当动态加载数据时，作为第二个参数传入的callback函数仅在初始数据加载时触发。
后续的数据加载会在之后进行，但callback不会再次调用。

如果希望每次数据加载到Scheduler时都执行回调，建议使用 [onLoadEnd](api/event/onloadend.md) 事件。

### 迁移说明

从版本5.2开始，scheduler会自动检测数据格式。

在5.2之前的版本中，该方法接受三个参数:

- **url** - (*string*) 服务器端URL（可以是静态文件或输出XML数据的服务器端脚本）
- **type** - (*string*) <i>('json', 'xml', 'ical')</i> 指定数据类型，默认值为 <i>'xml'</i>
- **callback** - (*function*) 加载完成后调用的函数

### Related API
- [onLoadEnd](api/event/onloadend.md)
- [onLoadStart](api/event/onloadstart.md)
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)

### Related Guides
- [데이터 포맷 예시](guides/data-formats.md)
- [데이터 불러오기](guides/loading-data.md)

### Change log
- 从版本5.2开始，移除了第二个 **type** 参数。
