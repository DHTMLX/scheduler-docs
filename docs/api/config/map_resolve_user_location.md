---
sidebar_label: map_resolve_user_location
title: "map_resolve_user_location config"
description: "enables/disables prompts asking the user to share his location for displaying on the map"
---

# map_resolve_user_location

### Description

@short: Enables/disables prompts asking the user to share his location for displaying on the map

@signature: map_resolve_user_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_user_location = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

You can also specify the **resolve_user_location** setting inside the [map_settings](api/config/map_settings.md) configuration object.

Some browsers open up the opportunity to determine the user's location. And if this option is set to *true*, such an opportunity will be offered while the map is being loaded.
