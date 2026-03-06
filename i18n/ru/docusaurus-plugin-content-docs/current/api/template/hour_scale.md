---
sidebar_label: "hour_scale"
title: "hour_scale template"
description: "определяет элементы, отображаемые на оси Y"
---

# hour_scale

### Description

@short: Определяет элементы, отображаемые на оси Y

@signature: hour_scale: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата для форматирования

### Returns
- ` text` - (string) - html текст, используемый для отображения в scheduler

### Example

~~~jsx
scheduler.templates.hour_scale = function(date){
    return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
- [Шаблоны недельного вида](views/week-view-templates.md)
