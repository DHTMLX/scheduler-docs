---
sidebar_label: "month_date"
title: "month_date template"
description: "задаёт дату, отображаемую в заголовке вида"
---

# month_date

### Description

@short: Задаёт дату, отображаемую в заголовке вида

@signature: month_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которая должна быть отформатирована

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.month_date = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
