---
sidebar_label: map_resolve_event_location
title: "map_resolve_event_location конфигурация"
description: "Активирует попытки определения местоположения события, если в базе данных отсутствуют сохранённые координаты события"
---

# map_resolve_event_location

### Description

@short: Активирует попытки определения местоположения события, если в базе данных отсутствуют сохранённые координаты события

@signature: map_resolve_event_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Значение по умолчанию:** true

**Применимые представления:**  [Map view](views/map.md)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view). 
:::

Вы также можете указать настройку **resolve_event_location** внутри конфигурационного объекта [map_settings](api/config/map_settings.md).

- Если опция установлена в *true*, и у события в базе данных отсутствуют значения 'lat' и 'lng', планировщик попытается определить координаты на основе значения 'event_location' во время загрузки событий в планировщик. Если указанное местоположение будет идентифицировано, соответствующие координаты будут сохранены в БД. Если нет, планировщик вызовет событие [onLocationError](api/event/onlocationerror.md).
- Включение свойства полезно для миграции, но не для стадии продакшна.