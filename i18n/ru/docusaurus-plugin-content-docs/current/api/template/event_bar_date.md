---
sidebar_label: "event_bar_date"
title: "event_bar_date template"
description: "используется для установки даты события. Применяется только к событиям, которые длятся один день"
---

# event_bar_date

### Description

@short: Используется для установки даты события. Применяется только к событиям, которые длятся один день

@signature: event_bar_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события  
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - сам объект события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.event_bar_date = function(start,end,ev){
     return "• <b>"+scheduler.templates.event_date(start)+"</b> ";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
