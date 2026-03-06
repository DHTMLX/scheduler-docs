---
sidebar_label: "lightbox_header"
title: "lightbox_header template"
description: "定义 lightbox 的头部区域"
---

# lightbox_header

### Description

@short: 定义 lightbox 的头部区域

@signature: lightbox_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件的开始日期
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 要在 scheduler 中显示的 HTML 内容

### Example

~~~jsx
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
~~~

### Details

如果未定义 [lightbox_header](api/template/lightbox_header.md) 模板，头部的日期部分将默认使用 [event_header](api/template/event_header.md) 模板中指定的格式。

### Related Guides
- [공통 템플릿](guides/common-templates.md#lightbox)

