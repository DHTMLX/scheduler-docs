---
sidebar_label: "week_scale_date"
title: "week_scale_date template"
description: "определяет дату, отображаемую в подзаголовке представления"
---

# week_scale_date

### Description

@short: Определяет дату, отображаемую в подзаголовке представления

@signature: week_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которая должна быть отформатирована

### Returns
- ` text` - (string) - html текст, используемый для рендеринга в scheduler

### Example

~~~jsx
var format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
    return format(date);
};
~~~

**Applicable views:** [Week view](views/week.md)

### Related Guides
- [Шаблоны недельного вида](views/week-view-templates.md)
