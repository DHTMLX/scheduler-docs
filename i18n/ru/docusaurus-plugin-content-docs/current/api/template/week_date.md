---
sidebar_label: "week_date"
title: "week_date template"
description: "задаёт дату, отображаемую в заголовке представления"
---

# week_date

### Description

@short: Задаёт дату, отображаемую в заголовке представления

@signature: week_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата представления
- `end` - (required) *Date* - конечная дата представления

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Доступные представления:** [Week view](views/week.md), [Week Agenda view](views/weekagenda.md)

### Related Guides
- [Шаблоны недельного вида](views/week-view-templates.md)
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)
