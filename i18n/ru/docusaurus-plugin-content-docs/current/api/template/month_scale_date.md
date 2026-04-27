---
sidebar_label: "month_scale_date"
title: "month_scale_date template"
description: "определяет формат даты, используемый на оси X в месячном представлении"
---

# month_scale_date

### Description

@short: Определяет формат даты, используемый на оси X в месячном представлении

@signature: month_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст, который будет отображаться в scheduler

### Example

~~~jsx
const formatMonthScale = scheduler.date.date_to_str("%l");

scheduler.templates.month_scale_date = function(date){
    return formatMonthScale(date);
};
~~~

**Доступные представления:** [Month view](views/month.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
