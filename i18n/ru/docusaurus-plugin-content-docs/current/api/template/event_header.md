---
sidebar_label: "event_header"
title: "event_header template"
description: "определяет содержимое заголовка для события"
---

# event_header

### Description

@short: Определяет содержимое заголовка для события

@signature: event_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект с данными события

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
- [Шаблоны недельного вида](views/week-view-templates.md)
