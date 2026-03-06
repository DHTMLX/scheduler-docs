---
sidebar_label: xml_date
title: "xml_date template"
description: "a string from an XML file is converted into a date object in conformity with this template"
---

# xml_date
:::warning 
The template is deprecated
:::
### Description

@short: A string from an XML file is converted into a date object in conformity with this template

@signature: xml_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - the string which need to be parsed

### Returns
- ` date` - (Date) - date object

### Example

~~~jsx
var cfg = scheduler.config;
var str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 The template is deprecated. Use [parse_date](api/template/parse_date.md) instead: 
:::

~~~js
var cfg = scheduler.config;
var strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related Guides
- [Loading Data](guides/loading-data.md)

### Change log
- deprecated since v5.2
