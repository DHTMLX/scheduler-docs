---
sidebar_label: map_start
title: "map_start config"
description: "устанавливает дату начала отображения событий"
---

# map_start

### Description

@short: Устанавливает дату начала отображения событий

@signature: map_start: Date

### Example

~~~jsx
scheduler.config.map_start = new Date(2025, 7, 1);
scheduler.config.map_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "map");
~~~

**Значение по умолчанию:** текущая дата пользователя

**Доступные представления:** [Вид карты](views/map.md)

### Related samples
- [Настройка вида карты](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view).
:::

### Related API
- [map_end](api/config/map_end.md)