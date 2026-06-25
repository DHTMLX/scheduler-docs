---
sidebar_label: map_end
title: "конфигурация map_end"
description: "задает дату до которой следует отображать события"
---

# map_end

### Description

@short: Задает дату до которой следует отображать события

@signature: map_end: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2026, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "map");
~~~

**Значение по умолчанию:** 'map_start' (значение) + 1 год

**Применимые представления:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view) для работы. 
 :::

### Related API
- [map_start](api/config/map_start.md)