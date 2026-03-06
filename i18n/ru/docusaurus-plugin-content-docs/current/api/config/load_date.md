---
sidebar_label: "load_date"
title: "load_date config"
description: "определяет формат параметров запроса 'from' и 'to' на сервер при использовании динамической загрузки"
---

# load_date

### Description

@short: Определяет формат параметров запроса 'from' и 'to' на сервер при использовании динамической загрузки

@signature: load_date: string

### Example

~~~jsx
scheduler.config.load_date = "%Y.%m.%d";
scheduler.init('scheduler_here',new Date(2009,10,1),"month");

scheduler.setLoadMode("month");
scheduler.load("data/events.php");
~~~

**Default value:** "%Y-%m-%d"

### Related API
- [setLoadMode](api/method/setloadmode.md)
- [load_format](api/template/load_format.md)

### Related Guides
- [Загрузка данных](guides/loading-data.md#dynamic-loading)
