---
sidebar_label: "map_resolve_user_location"
title: "map_resolve_user_location config"
description: "управляет тем, будет ли пользователю предложено поделиться своей локацией для отображения на карте"
---

# map_resolve_user_location

### Description

@short: Управляет тем, будет ли пользователю предложено поделиться своей локацией для отображения на карте

@signature: map_resolve_user_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Свойство требует включения плагина [map_view](guides/extensions-list.md#mapview). 
:::

Настройка **resolve_user_location** также может быть определена внутри объекта конфигурации [map_settings](api/config/map_settings.md).

Некоторые браузеры предоставляют возможность доступа к локации пользователя. Если этот параметр установлен в *true*, при загрузке карты пользователю будет предложено поделиться своей локацией.
