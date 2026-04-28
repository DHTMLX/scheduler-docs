---
sidebar_label: load_date
title: "load_date конфигурация"
description: "задает формат параметров запроса к серверу 'from', 'to' в случае динамической загрузки"
---

# load_date

### Description

@short: Задает формат параметров запроса к серверу 'from', 'to' в случае динамической загрузки

@signature: load_date: string

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");
~~~

**Значение по умолчанию:** "%Y-%m-%d"

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Loading Data](guides/loading-data.md#dynamic-loading)