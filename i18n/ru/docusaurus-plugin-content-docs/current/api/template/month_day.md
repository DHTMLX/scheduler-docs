---
sidebar_label: "month_day"
title: "month_day template"
description: "определяет, как день отображается в ячейке"
---

# month_day

### Description

@short: Определяет, как день отображается в ячейке

@signature: month_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую нужно отформатировать

### Returns
- ` text` - (string) - html-текст, используемый для отображения в scheduler

### Example

~~~jsx
scheduler.templates.month_day = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_day);
    return  dateToStr_func(date);
};
~~~

**Доступные представления:** [Month view](views/month.md), [Year view](views/year.md)

### Related Guides
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
- [Шаблоны годового вида](views/year-view-templates.md)
