---
sidebar_label: "agenda_text"
title: "agenda_text template"
description: "определяет текст, отображаемый во втором столбце вида Agenda"
---

# agenda_text

### Description

@short: Определяет текст, отображаемый во втором столбце вида Agenda

@signature: agenda_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - данные события

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
scheduler.templates.agenda_text = function(start,end,ev){
     return ev.text;
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 Для работы шаблона требуется включенный плагин [agenda_view](guides/extensions-list.md#agenda-view). 
:::

Если шаблон **agenda_text** не установлен, 
часть с датой 'd-m-y' будет использовать формат из шаблона [day_date](api/template/day_date.md).

### Related Guides
- [Шаблоны представления Agenda](views/agenda-view-templates.md)
