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
const cfg = scheduler.config;
const str_to_date = scheduler.date.str_to_date(cfg.xml_date, cfg.server_utc);

scheduler.templates.xml_date = function(date){
    return str_to_date(date);
};
~~~

### Details

:::note
 The template is deprecated. Use [parse_date](api/template/parse_date.md) instead: 
:::

~~~js
const cfg = scheduler.config;
const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);
 
scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Related Guides
- [Loading Data](guides/loading-data.md)

### Change log
- deprecated since v5.2
