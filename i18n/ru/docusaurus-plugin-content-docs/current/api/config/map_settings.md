---
sidebar_label: map_settings
title: "map_settings config"
description: "содержит параметры конфигурации, связанные с картой"
---

# map_settings

### Description

@short: Обеспечивает параметры конфигурации, связанные с картой

@signature: map_settings: any

### Example

~~~jsx
// пример предоставляет значения по умолчанию настроек карты
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Доступные представления:** [Map view](views/map.md)

### Details

:::note
 Свойство требует активированного плагина [map_view](guides/extensions-list.md#map-view) для активации. 
:::

Объект конфигурации включает следующие свойства:

- **initial_position** - устанавливает начальное положение карты
- **error_position** - устанавливает положение, которое будет отображаться на карте в случае, если местоположение события не может быть идентифицировано
- **initial_zoom** - устанавливает начальное масштабирование карты во Map view
- **zoom_after_resolve** - устанавливает масштаб, который будет использоваться для отображения местоположения пользователя, если пользователь согласится на предложение браузера показать его
- **info_window_max_width** - максимальная ширина всплывающего окна маркера на карте во Map view
- **resolve_user_location** - включает/выключает запросы на предоставление пользователем своего местоположения для отображения на карте
- **resolve_event_location** - активирует попытки определить местоположение события, если в базе данных не сохранены координаты события
- **view_provider** - указывает поставщика карт

Вы можете задать собственные настройки карты внутри объекта **map_settings**, например некоторые токены:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### Change log
- Добавлено в v7.1