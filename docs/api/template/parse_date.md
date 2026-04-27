---
sidebar_label: parse_date
title: "parse_date template"
description: "converts date string into a Date object"
---

# parse_date

### Description

@short: Converts date string into a Date object

@signature: parse_date: (date: string) =\> Date

### Parameters

- `date` - (required) *string* - the string which need to be parsed

### Returns
- ` date` - (Date) - Date object

### Example

~~~jsx
const cfg = scheduler.config;
const strToDate = scheduler.date.str_to_date(cfg.date_format, cfg.server_utc);

scheduler.templates.parse_date = function(date){
    return strToDate (date);
};
~~~

### Details

This function is called from **scheduler.load()** or **scheduler.parse()** call to parse the *start_date/end_date* properties of events, if they are provided in the string format. 
This function can be redefined if you use a custom format that the default method can't parse. Check [Date Format Specification](guides/settings-format.md).

[Read more about date objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### Related API
- [parse](api/method/parse.md)
- [load](api/method/load.md)

### Related Guides
- [Loading Data](guides/loading-data.md)
- [Date Format Specification](guides/settings-format.md)
- [Server-Side Integration](guides/server-integration.md)
