---
sidebar_label: "map_view_provider"
title: "map_view_provider config"
description: "definiert, welchen Map-Provider verwendet werden soll"
---

# map_view_provider

### Description

@short: Definiert, welchen Map-Provider verwendet werden soll

@signature: map_view_provider: string

### Example

~~~jsx
scheduler.config.map_view_provider = "googleMap";
...
scheduler.init('scheduler_here', new Date(2027, 05, 11), "map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Es ist auch möglich, den Map-Provider innerhalb des Konfigurationsobjekts [map_settings](api/config/map_settings.md) zu setzen.

### Change log
- hinzugefügt in v7.1
