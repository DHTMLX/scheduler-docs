---
sidebar_label: "day_scale_date"
title: "day_scale_date template"
description: "устанавливает дату, отображаемую в подзаголовке вида Day"
---

# day_scale_date

### Description

@short: Устанавливает дату, отображаемую в подзаголовке вида Day

@signature: day_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст, используемый для рендеринга в scheduler

### Example

~~~jsx
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};
~~~

**Applicable views:** [Day view](views/day.md)

### Related Guides
- [Шаблоны для дневного вида](views/day-view-templates.md)
