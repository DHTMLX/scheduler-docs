---
sidebar_label: xml_format
title: "xml_format template"
description: "a date object is converted into a string in conformity with this template. Used to send data back to the server"
---

# xml_format
:::warning 
The template is deprecated
:::
### Description

@short: A date object is converted into a string in conformity with this template. Used to send data back to the server

@signature: xml_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - the date which needs formatting

### Returns
- ` text` - (string) - a text representation of the date

### Example

~~~jsx
const cfg = scheduler.config;
const date_to_str = scheduler.date.date_to_str(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_format = function(date){
    return date_to_str(date);
};
~~~

### Details

:::note
 The template is deprecated. Use [format_date](api/template/format_date.md) instead: 
:::

~~~js
const dateToStr = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
scheduler.templates.format_date = function(date){
    return dateToStr (date);
};
~~~

### Related Guides
- [Loading Data](guides/loading-data.md)
- [Server-Side Integration](guides/server-integration.md)

### Change log
- deprecated since v5.2
