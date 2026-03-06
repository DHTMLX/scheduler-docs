---
sidebar_label: "map_type"
title: "map_type config"
description: "definiert den Typ der Google Maps"
---

# map_type
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Definiert den Typ der Google Maps

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
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Change log
- deprecated seit v7.1
