---
sidebar_label: "parse"
title: "parse method"
description: "处理从客户端资源加载数据"
---

# parse

### Description

@short: 处理从客户端资源加载数据

@signature: parse: (data: any) =\> void

### Parameters

- `data` - (required) *object* - 一个包含数据的字符串或对象

### Example

~~~jsx
scheduler.parse([
     { start_date:"2027-05-13 6:00", end_date:"2027-05-13 8:00", text:"Event 1"},
     { start_date:"2027-06-09 6:00", end_date:"2027-06-09 8:00", text:"Event 2"}
]);
~~~

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

### 迁移说明

从版本 5.2 开始，scheduler 会自动识别数据格式。

在早期版本（5.2 之前），该方法接受两个参数:

- **data** - (*object*)    包含数据的字符串或对象；
- **type** - (*string*)    可选，(<i>'json', 'xml', 'ical'</i>) 指定数据类型。默认值为 <i>'xml'</i>

### Related API
- [onBeforeParse](api/event/onbeforeparse.md)
- [onParse](api/event/onparse.md)
- [parse_date](api/template/parse_date.md)

### Related Guides
- [데이터 포맷 예시](guides/data-formats.md)

### Change log
- 第二个 **type** 参数在版本 5.2 中被移除。
