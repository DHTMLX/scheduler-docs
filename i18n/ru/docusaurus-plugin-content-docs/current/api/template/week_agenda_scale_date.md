---
sidebar_label: "week_agenda_scale_date"
title: "week_agenda_scale_date template"
description: "дата, отображаемая в ячейке дня в представлении"
---

# week_agenda_scale_date
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Дата, отображаемая в ячейке дня в представлении

@signature: week_agenda_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.week_agenda_scale_date = function(date) {
        const scale_date_format = scheduler.date.date_to_str("%l, %F %d");
        return scale_date_format(date);
};
~~~

**Доступные представления:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Этот шаблон требует включения плагина [week_agenda](guides/extensions-list.md#weekagenda). 
:::

### Related Guides
- [Шаблоны WeekAgenda View](views/weekagenda-view-templates.md)
