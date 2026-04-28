---
sidebar_label: "load_date"
title: "load_date config"
description: "definiert das Format für die Server-Anfrageparameter 'from' und 'to' bei der Verwendung von dynamic loading"
---

# load_date

### Description

@short: Definiert das Format für die Server-Anfrageparameter 'from' und 'to' bei der Verwendung von dynamic loading

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
- [Daten laden](guides/loading-data.md#dynamic-loading)
