---
sidebar_label: "map_error_position"
title: "map_error_position config"
description: "Определяет позицию, отображаемую на карте, когда местоположение события не может быть определено"
---

# map_error_position
:::warning
Эта функицональность устарела
::: 
### Description

@short: Определяет позицию, отображаемую на карте, когда местоположение события не может быть определено

@signature: map_error_position: any

### Example

~~~jsx
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");
~~~

**Default value:** google.maps.LatLng(15, 15)

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Это свойство требует включения плагина [map_view](guides/extensions-list.md#mapview). 
:::

«Позиция ошибки» применяется в следующих случаях:

1. Когда у события отсутствует одна или обе координаты (например, значения координат равны '0', 'null' или 'undefined') и опция [map_resolve_event_location](api/config/map_resolve_event_location.md) отключена.
2. Когда у события отсутствует одна или обе координаты, опция [map_resolve_event_location](api/config/map_resolve_event_location.md) включена, но scheduler не смог определить местоположение.

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- устарело с версии 7.1
