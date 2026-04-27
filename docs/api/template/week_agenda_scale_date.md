---
sidebar_label: week_agenda_scale_date
title: "week_agenda_scale_date template"
description: "the date of a day cell of the view"
---

# week_agenda_scale_date
:::info
 This functionality is available in the PRO edition only. 
:::

### Description

@short: The date of a day cell of the view

@signature: week_agenda_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.week_agenda_scale_date = function(date) {
        const scale_date_format = scheduler.date.date_to_str("%l, %F %d");
        return scale_date_format(date);
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 The template requires the [week_agenda](guides/extensions-list.md#week-agenda) plugin to be activated. 
:::

### Related Guides
- [WeekAgenda View Templates](views/weekagenda-view-templates.md)
