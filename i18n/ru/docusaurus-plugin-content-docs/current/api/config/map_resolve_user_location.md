---
sidebar_label: map_resolve_user_location
title: "map_resolve_user_location config"
description: "включает/выключает запросы к пользователю на предоставление его местоположения для отображения на карте"
---

# map_resolve_user_location

### Description

@short: Включает/выключает запросы к пользователю на предоставление его местоположения для отображения на карте

@signature: map_resolve_user_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

**Применимые представления:** [Map view](views/map.md)

### Details

:::note
 Свойство требует, чтобы был активирован плагин [map_view](guides/extensions-list.md#map-view).
 :::

Настройка **resolve_user_location** также может быть определена внутри объекта конфигурации [map_settings](api/config/map_settings.md).

Некоторые браузеры предоставляют возможность доступа к локации пользователя. Если этот параметр установлен в *true*, при загрузке карты пользователю будет предложено поделиться своей локацией.
