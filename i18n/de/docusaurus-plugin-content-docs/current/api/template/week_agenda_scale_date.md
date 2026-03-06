---
sidebar_label: "week_agenda_scale_date"
title: "week_agenda_scale_date template"
description: "Das Datum, das in einer Tageszelle der Ansicht angezeigt wird"
---

# week_agenda_scale_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Das Datum, das in einer Tageszelle der Ansicht angezeigt wird

@signature: week_agenda_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - Das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.week_agenda_scale_date = function(date) {
        var scale_date_format = scheduler.date.date_to_str("%l, %F %d");
        return scale_date_format(date);
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [week_agenda](guides/extensions-list.md#week-agenda) Plugin aktiviert ist. 
:::

### Related Guides
- [WeekAgenda-Ansichtsvorlagen](views/weekagenda-view-templates.md)
