---
sidebar_label: map_error_position
title: "map_error_position конфигурация"
description: "задает позицию, которая будет отображаться на карте в случае, если местоположение события не может быть определено"
---

# map_error_position
:::warning 
Свойство устарело
:::
### Description

@short: Задает позицию, которая будет отображаться на карте в случае, если местоположение события не может быть идентифицировано

@signature: map_error_position: any

### Example

~~~jsx
scheduler.config.map_error_position = new google.maps.LatLng(51.477840, -0.001492);
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Значение по умолчанию:** google.maps.LatLng(15, 15)

**Применимые представления:** [Вид карты](views/map.md)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view). 
:::

«Позиция ошибки» применяется в следующих случаях:

1. У события отсутствует одна из координат (или обе координаты) указаны (то есть координата имеет значение '0', 'null', 'undefined') и опция [map_resolve_event_location](api/config/map_resolve_event_location.md) отключена.
2. У события отсутствует одна из координат (или обе координаты) указаны и опция [map_resolve_event_location](api/config/map_resolve_event_location.md) включена, но планировщик не может определить местоположение.

### Related API
- [map_resolve_event_location](api/config/map_resolve_event_location.md)

### Change log
- устарело с версии v7.1