---
sidebar_label: "tooltip_date_format"
title: "tooltip_date_format template"
description: "definiert, wie Start- und Enddaten im tooltip angezeigt werden"
---

# tooltip_date_format

### Description

@short: Definiert, wie Start- und Enddaten im tooltip angezeigt werden

@signature: tooltip_date_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.tooltip_date_format=function (date){
    const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}
~~~

### Details

:::note
 Die Vorlage funktioniert nur, wenn das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#tooltips)
