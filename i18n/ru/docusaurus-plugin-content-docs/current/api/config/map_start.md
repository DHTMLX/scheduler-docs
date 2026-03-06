---
sidebar_label: "map_start"
title: "map_start config"
description: "указывает дату, с которой начнется отображение событий"
---

# map_start

### Description

@short: Указывает дату, с которой начнется отображение событий

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2012, 7, 1);
scheduler.config.map_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "map");
~~~

**Default value:** дата текущего пользователя

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Для использования этого свойства необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

### Related API
- [map_end](api/config/map_end.md)
