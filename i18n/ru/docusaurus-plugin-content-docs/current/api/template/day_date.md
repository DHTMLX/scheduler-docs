---
sidebar_label: "day_date"
title: "day_date template"
description: "определяет дату, отображаемую в заголовке для представлений Day и Units"
---

# day_date

### Description

@short: Определяет дату, отображаемую в заголовке для представлений Day и Units

@signature: day_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст, который будет отображён в scheduler

### Example

~~~jsx
scheduler.templates.day_date = function(date){
    var formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Units view](views/units.md)

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
