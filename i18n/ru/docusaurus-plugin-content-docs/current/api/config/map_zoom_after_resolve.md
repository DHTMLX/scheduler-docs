---
sidebar_label: map_zoom_after_resolve
title: "map_zoom_after_resolve конфигурация"
description: "устанавливает масштаб, который будет использоваться для отображения местоположения пользователя, если пользователь согласится с предложением браузера показать его"
---

# map_zoom_after_resolve

### Description

@short: Устанавливает масштаб, который будет использоваться для отображения местоположения пользователя, если пользователь согласится с предложением браузера показать его

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 15

**Доступные представления:** [Map view](views/map.md)

### Details

:::note
 Сво́йство требует активации плагина [map_view](guides/extensions-list.md#map-view).
:::

Вы также можете указать настройку **zoom_after_resolve** внутри конфигурационного объекта [map_settings](api/config/map_settings.md).