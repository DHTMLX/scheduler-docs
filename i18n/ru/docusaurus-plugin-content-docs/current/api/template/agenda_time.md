---
sidebar_label: "agenda_time"
title: "agenda_time template"
description: "определяет дату, отображаемую в первом столбце вида Agenda"
---

# agenda_time

### Description

@short: Определяет дату, отображаемую в первом столбце вида Agenda

@signature: agenda_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата события
- `end` - (required) *Date* - конечная дата события
- `event` - (required) *object* - данные события

### Returns
- ` text` - (string) - html-контент, используемый для отображения в scheduler

### Example

~~~jsx
const templates = scheduler.templates;
scheduler.templates.agenda_time = function(start, end, event){
  if (scheduler.isOneDayEvent(event)) {
    return templates.day_date(event) + " " + templates.event_date(start);
  } else {
    return templates.day_date(start) + " &ndash; " + 
        templates.day_date(end);
  }
};
~~~

**Доступные представления:** [Agenda view](views/agenda.md)

### Details

:::note
 Этот шаблон работает только если включен плагин [agenda_view](guides/extensions-list.md#agenda-view). 
:::

### Related Guides
- [Шаблоны представления Agenda](views/agenda-view-templates.md)
