---
sidebar_label: "event_text"
title: "event_text template"
description: "определяет текст, отображаемый для события"
---

# event_text

### Description

@short: Определяет текст, отображаемый для события

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект с данными события

### Returns
- ` text` - (string) - html-контент, используемый для отображения события в scheduler

### Example

~~~jsx
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

**Доступные представления:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Имейте в виду, что для Month и Timeline Views следует использовать шаблон [event_bar_text](api/template/event_bar_text.md) для задания текста события.

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
