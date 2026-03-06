---
sidebar_label: "map_resolve_event_location"
title: "map_resolve_event_location config"
description: "включает автоматические попытки определения местоположения события, если его координаты ещё не сохранены в базе данных"
---

# map_resolve_event_location

### Description

@short: Включает автоматические попытки определения местоположения события, если его координаты ещё не сохранены в базе данных

@signature: map_resolve_event_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Для работы этой функции необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

Опция **resolve_event_location** также может быть установлена внутри объекта конфигурации [map_settings](api/config/map_settings.md).

- Если включено (*true*), и у события отсутствуют значения 'lat' и 'lng' в базе данных, scheduler при загрузке событий попытается определить координаты на основе поля 'event_location'. В случае успешного определения координаты будут сохранены обратно в базу данных. Если определить координаты не удалось, scheduler вызовет событие [onLocationError](api/event/onlocationerror.md).
- Эта настройка особенно полезна при миграции, но обычно не рекомендуется использовать её в рабочей среде.
