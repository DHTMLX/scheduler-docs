---
sidebar_label: "week_agenda_date"
title: "week_agenda_date template"
description: "определяет дату, отображаемую в заголовке представления Week Agenda"
---

# week_agenda_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет дату, отображаемую в заголовке представления Week Agenda

@signature: week_agenda_date: (start: Date, end: Date) =\> void

### Parameters

- `start` - (required) *Date* - начальная дата представления
- `end` - (required) *Date* - конечная дата представления

### Example

~~~jsx
scheduler.templates.week_agenda_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Доступные представления:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Этот template работает только при включенном плагине [week_agenda](guides/extensions-list.md#weekagenda). 
:::

### Related Guides
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)

### Change log
- добавлено в версии v6.0
