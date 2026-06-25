---
sidebar_label: tooltip_date_format
title: "tooltip_date_format template"
description: "specifies the format of start and end dates displayed in the tooltip"
---

# tooltip_date_format

### Description

@short: Specifies the format of start and end dates displayed in the tooltip

@signature: tooltip_date_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.tooltip_date_format=function (date){
    const formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}
~~~

### Details

:::note
 The template requires the [tooltip](guides/extensions-list.md#tooltip) plugin to be enabled. 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- [Common Templates](guides/common-templates.md#tooltips)
