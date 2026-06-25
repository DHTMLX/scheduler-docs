---
sidebar_label: load_date
title: "load_date config"
description: "sets the format of server request parameters 'from', 'to' in case of dynamic loading"
---

# load_date

### Description

@short: Sets the format of server request parameters 'from', 'to' in case of dynamic loading

@signature: load_date: string

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2027,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");
~~~

**Default value:** "%Y-%m-%d"

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Loading Data](guides/loading-data.md#dynamic-loading)
