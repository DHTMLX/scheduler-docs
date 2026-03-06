---
sidebar_label: map_infowindow_max_width
title: "map_infowindow_max_width config"
description: "the maximum width of the map's popup marker in the Map view"
---

# map_infowindow_max_width

### Description

@short: The maximum width of the map's popup marker in the Map view

@signature: map_infowindow_max_width: number

### Example

~~~jsx
scheduler.config.map_infowindow_max_width = 350;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** 300

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

You can also specify the **infowindow_max_width** setting inside the [map_settings](api/config/map_settings.md) configuration object.
