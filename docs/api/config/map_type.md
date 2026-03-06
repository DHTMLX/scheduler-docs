---
sidebar_label: map_type
title: "map_type config"
description: "sets the type of Google Maps"
---

# map_type
:::warning 
The property is deprecated
:::
### Description

@short: Sets the type of Google Maps

@signature: map_type: any

### Example

~~~jsx
scheduler.config.map_type = google.maps.MapTypeId.HYBRID;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"map");
~~~

**Default value:** ROADMAP

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

### Change log
- deprecated since v7.1
