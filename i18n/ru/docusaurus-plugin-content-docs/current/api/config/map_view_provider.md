---
sidebar_label: map_view_provider
title: "Конфигурация map_view_provider"
description: "указывает провайдера карт"
---

# map_view_provider

### Description

@short: Указывает провайдера карт

@signature: map_view_provider: string

### Values 

- "googleMap"|"openStreetMaps"|"mapbox"

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"map");
~~~

**Значение по умолчанию:** googleMap

**Доступные представления:** [Карта](views/map.md)

### Details

:::note
 Свойство требует активации плагина [map_view](guides/extensions-list.md#map-view). 
:::

Вы также можете указать провайдера карт внутри конфигурационного объекта [map_settings](api/config/map_settings.md).

### Change log
- добавлено в v7.1