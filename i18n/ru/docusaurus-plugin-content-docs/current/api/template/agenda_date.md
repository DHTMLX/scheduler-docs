---
sidebar_label: "agenda_date"
title: "agenda_date template"
description: "определяет дату, отображаемую в заголовке представления"
---

# agenda_date

### Description

@short: Определяет дату, отображаемую в заголовке представления

@signature: agenda_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - начальная дата представления
- `end` - (required) *Date* - конечная дата представления

### Returns
- ` text` - (string) - HTML-содержимое, которое будет отображено

### Example

~~~jsx
// определение по умолчанию
scheduler.templates.agenda_date = function(start, end) {
     return '';
};
~~~

**Доступные представления:** [Agenda view](views/agenda.md)

### Details

:::note
 Этот шаблон работает только при включенном плагине [agenda_view](guides/extensions-list.md#agenda-view). 
:::

### Related Guides
- [Шаблоны представления Agenda](views/agenda-view-templates.md)
