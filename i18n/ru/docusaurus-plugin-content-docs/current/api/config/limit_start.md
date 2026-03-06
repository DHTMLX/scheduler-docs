---
sidebar_label: "limit_start"
title: "limit_start config"
description: "задаёт начальную границу допустимого диапазона дат"
---

# limit_start

### Description

@short: Задаёт начальную границу допустимого диапазона дат

@signature: limit_start: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
...
scheduler.init('scheduler_here', new Date(2018,5,30), "week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 Для использования этого свойства необходимо включить плагин [limit](guides/extensions-list.md#limit). 
:::

Настройки **limit_start** и **limit_end** ограничивают диапазон дат, в котором можно создавать новые события. Кроме того, можно запретить просмотр событий за пределами этого допустимого диапазона, включив свойство `limit_view`:

~~~js
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_end](api/config/limit_end.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Блокировка и выделение дат](guides/limits.md)
