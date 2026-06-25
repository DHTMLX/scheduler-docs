---
sidebar_label: map_zoom_after_resolve
title: "map_zoom_after_resolve config"
description: "sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it"
---

# map_zoom_after_resolve

### Description

@short: Sets the zoom that will be used to show the user's location, if the user agrees to the browser's offer to show it

@signature: map_zoom_after_resolve: number

### Example

~~~jsx
scheduler.config.map_zoom_after_resolve = 10;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 15

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

You can also specify the **zoom_after_resolve** setting inside the [map_settings](api/config/map_settings.md) configuration object.
