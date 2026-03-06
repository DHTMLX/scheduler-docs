---
sidebar_label: "agenda_day"
title: "agenda_day template"
description: "определяет, что отображается внутри ячейки дня в представлении Agenda"
---

# agenda_day

### Description

@short: Определяет, что отображается внутри ячейки дня в представлении Agenda

@signature: agenda_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - html-содержимое, которое будет отображено в scheduler

### Example

~~~jsx
const dayDateToStr = scheduler.date.date_to_str("%F %j");
const dayDowToStr = scheduler.date.date_to_str("%l");

scheduler.templates.agenda_day = function(date){ 
    return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
    <div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
};
~~~

### Related Guides
- [Представление Agenda](views/agenda.md)

### Change log
- добавлено в версии 7.0
