---
sidebar_label: xml_date
title: "xml_date config"
description: "defines date formats that are used to parse data from a data set and to send data to a server"
---

# xml_date
:::warning 
The property is deprecated
:::
### Description

@short: defines date formats that are used to parse data from a data set and to send data to a server

@signature: xml_date: string

### Example

~~~jsx
gantt.config.xml_date="%Y-%m-%d %H:%i";
...
gantt.init("gantt_here");
gantt.load("../data/tasks.json");
~~~

**Default value:** %m/%d/%Y %H:%i

### Details
The xml_date property is deprecated. Use `date_format` instead:


### Related Guides
- [Date Format Specification](guides/settings-format.md)

### Change log
- deprecated since v6.2, removed since v7.0
