---
sidebar_label: "event_date"
title: "event_date template"
description: "определяет временную часть даты начала и окончания события. В основном используется другими шаблонами для отображения временных интервалов."
---

# event_date

### Description

@short: Определяет временную часть даты начала и окончания события. В основном используется другими шаблонами для отображения временных интервалов.

@signature: event_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст для рендеринга в scheduler

### Example

~~~jsx
scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}
~~~

### Related Guides
- [Общие шаблоны](guides/common-templates.md#lightbox)
