---
sidebar_label: "year_month"
title: "year_month template"
description: "определяет название месяца, отображаемое в заголовке блока месяца в представлении."
---

# year_month

### Description

@short: Определяет название месяца, отображаемое в заголовке блока месяца в представлении.

@signature: year_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Этот шаблон требует включения плагина [year_view](guides/extensions-list.md#year). 
:::

### Related Guides
- [Шаблоны годового вида](views/year-view-templates.md)
