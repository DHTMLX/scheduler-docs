---
sidebar_label: map_type
title: "map_type config"
description: "sets the type of Google Maps"
---

# map_type
:::warning 
Свойство устарело
:::
### Description

@short: Устанавливает тип Google Maps

@signature: map_type: any

### Example

~~~jsx
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Значение по умолчанию:** ROADMAP

**Поддерживаемые представления:** [Вид карты](views/map.md)

### Details

:::note
 Своьство требует активированного плагина [map_view](guides/extensions-list.md#map-view) для активации. 
:::

### Change log
- устарело с версии v7.1