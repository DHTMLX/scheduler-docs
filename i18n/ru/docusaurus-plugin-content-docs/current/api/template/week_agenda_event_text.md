---
sidebar_label: "week_agenda_event_text"
title: "week_agenda_event_text template"
description: "определяет текст, отображаемый для события"
---

# week_agenda_event_text
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет текст, отображаемый для события

@signature: week_agenda_event_text: (start: Date, end: Date, event: any, cellDate: Date, pos: string) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - объект с данными события
- `cellDate` - (required) *Date* - дата ячейки дня, в которой отображается событие длительностью в один день или отдельный экземпляр повторяющегося события
- `pos` - (required) *string* - позиция этого вхождения в повторяющемся событии: 'start' для первого, 'end' для последнего, 'middle' для всех остальных

### Returns
- ` text` - (string) - html-контент, используемый для отображения события в scheduler

### Example

~~~jsx
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
    return scheduler.templates.event_date(start_date) + " " + event.text;
};
~~~

**Доступные представления:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Этот шаблон работает только при включенном плагине [week_agenda](guides/extensions-list.md#weekagenda). 
:::

### Related Guides
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)
