---
sidebar_label: "year_scale_date"
title: "year_scale_date template"
description: "определяет название дня, отображаемое в подзаголовке внутри блока месяца в представлении"
---

# year_scale_date

### Description

@short: Определяет название дня, отображаемое в подзаголовке внутри блока месяца в представлении

@signature: year_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата для форматирования

### Returns
- ` text` - (string) - html-контент для отображения в scheduler

### Example

~~~jsx
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Этот template требует включения плагина [year_view](guides/extensions-list.md#year). 
:::

### Related Guides
- [Шаблоны годового вида](views/year-view-templates.md)
