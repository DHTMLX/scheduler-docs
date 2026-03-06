---
sidebar_label: "lightbox_header"
title: "lightbox_header template"
description: "определяет секцию заголовка lightbox"
---

# lightbox_header

### Description

@short: Определяет секцию заголовка lightbox

@signature: lightbox_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата события   
- `end` - (required) *Date* - конечная дата события
- `event` - (required) *object* - объект события

### Returns
- ` text` - (string) - HTML-контент, который будет отображён в scheduler

### Example

~~~jsx
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
~~~

### Details

Если шаблон [lightbox_header](api/template/lightbox_header.md) не задан, дата в заголовке будет отображаться в формате, определённом шаблоном [event_header](api/template/event_header.md).

### Related Guides
- [Общие шаблоны](guides/common-templates.md#lightbox)
