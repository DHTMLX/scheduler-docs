---
sidebar_label: map_view_provider
title: "map_view_provider config"
description: "specifies the map provider"
---

# map_view_provider

### Description

@short: Specifies the map provider

@signature: map_view_provider: string

### Values 

- "googleMap"|"openStreetMaps"|"mapbox"

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

**Default value:**  googleMap

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

You can also specify the map provider inside the [map_settings](api/config/map_settings.md) configuration object.

### Change log
- added in v7.1
