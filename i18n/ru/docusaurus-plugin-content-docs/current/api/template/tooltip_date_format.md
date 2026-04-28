---
sidebar_label: "tooltip_date_format"
title: "tooltip_date_format template"
description: "определяет, как отображаются даты начала и окончания в tooltip"
---

# tooltip_date_format

### Description

@short: Определяет, как отображаются даты начала и окончания в tooltip

@signature: tooltip_date_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html текст для отображения в scheduler

### Example

~~~jsx
scheduler.templates.tooltip_date_format=function (date){
    const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}
~~~

### Details

:::note
 Шаблон работает только если активирован плагин [tooltip](guides/extensions-list.md#tooltip). 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Общие шаблоны](guides/common-templates.md#tooltips)
