---
sidebar_label: "year_date"
title: "year_date template"
description: "задаёт дату, отображаемую в заголовке вида"
---

# year_date

### Description

@short: Задаёт дату, отображаемую в заголовке вида

@signature: year_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - дата, которую необходимо отформатировать

### Returns
- ` text` - (string) - html-текст, используемый для отображения в scheduler

### Example

~~~jsx
var date_to_str=scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
    return date_to_str(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 Этот template требует включения плагина [year_view](guides/extensions-list.md#year). 
:::

### Related Guides
- [Шаблоны годового вида](views/year-view-templates.md)
