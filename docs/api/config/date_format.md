---
sidebar_label: date_format
title: "date_format config"
description: "sets the date format that is used to parse data from a data set and to send dates back to the server"
---

# date_format

### Description

@short: Sets the date format that is used to parse data from a data set and to send dates back to the server

@signature: date_format: string

### Example

~~~jsx
scheduler.config.date_format = "%Y-%m-%d %H:%i";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
scheduler.load("/data/events");
~~~

**Default value:** "%Y-%m-%d %H:%i"

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

This config value is used to generate [parse_date](api/template/parse_date.md) and [format_date](api/template/format_date.md) template functions. 
If you want to use a custom format, you can either change this config, or redefine **parse_date** and **format_date** templates directly.

### Related API
- [parse_date](api/template/parse_date.md)
- [format_date](api/template/format_date.md)

### Related Guides
- [Date Format Specification](guides/settings-format.md)
