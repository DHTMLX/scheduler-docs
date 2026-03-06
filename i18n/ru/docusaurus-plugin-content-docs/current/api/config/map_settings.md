---
sidebar_label: "map_settings"
title: "map_settings config"
description: "содержит параметры конфигурации, связанные с картой"
---

# map_settings

### Description

@short: Содержит параметры конфигурации, связанные с картой

@signature: map_settings: any

### Example

~~~jsx
// этот пример показывает настройки карты по умолчанию
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
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Для использования этого свойства необходимо включить плагин [map_view](guides/extensions-list.md#mapview). 
:::

Объект конфигурации включает следующие свойства:

- **initial_position** - задаёт начальную позицию карты
- **error_position** - задаёт запасную позицию, отображаемую, если местоположение события определить не удалось
- **initial_zoom** - устанавливает уровень масштабирования при первой загрузке карты
- **zoom_after_resolve** - определяет уровень масштабирования для отображения местоположения пользователя, если разрешение получено
- **info_window_max_width** - задаёт максимальную ширину всплывающего окна маркера на карте
- **resolve_user_location** - включает или отключает запросы разрешения у пользователя на определение его местоположения для отображения на карте
- **resolve_event_location** - включает попытки определить местоположение события, если координаты не сохранены в базе данных
- **view_provider** - выбирает провайдера картографического сервиса

Дополнительные настройки карты, например, токены, можно добавить внутри объекта **map_settings**:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### Change log
- Добавлено в версии v7.1
