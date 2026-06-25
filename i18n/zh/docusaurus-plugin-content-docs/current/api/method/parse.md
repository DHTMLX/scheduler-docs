---
sidebar_label: parse
title: "parse 方法"
description: "从客户端资源加载数据"
---

# parse

### Description

@short: 从客户端资源加载数据

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (必填) *object* - 一个表示数据的字符串或对象

### Example

~~~jsx
scheduler.parse([
    { start_date: "2027-05-13 6:00", end_date: "2027-05-13 8:00", text: "Event 1" },
    { start_date: "2027-06-09 6:00", end_date: "2027-06-09 8:00", text: "Event 2" }
]);
~~~

### Related samples
- [将事件着色](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [将事件级联显示](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

## Migration

在 v5.2 及以后版本中，Scheduler 会自动检测数据格式。

但在 v5.2 之前，该方法包含两个参数：

- `data` - (*object*) 一个表示数据的字符串或对象
- `type` - (*string*) 可选，(*'json', 'xml', 'ical'*) 数据类型。默认值是 *'xml'*

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [Examples of Data Formats](guides/data-formats.md)

### Change log
- 在 v5.2 中，该方法的第二个 `type` 参数已被移除。