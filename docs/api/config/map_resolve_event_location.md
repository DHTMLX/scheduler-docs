---
sidebar_label: map_resolve_event_location
title: "map_resolve_event_location config"
description: "activates attempts to resolve the event's location, if the database doesn't have the event's coordinates stored"
---

# map_resolve_event_location

### Description

@short: Activates attempts to resolve the event's location, if the database doesn't have the event's coordinates stored

@signature: map_resolve_event_location: boolean

### Example

~~~jsx
scheduler.config.map_resolve_event_location = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 The property requires the [map_view](guides/extensions-list.md#map-view) plugin to be activated. 
:::

You can also specify the **resolve_event_location** setting inside the [map_settings](api/config/map_settings.md) configuration object.

- If the option is set to *true*, and an event in the database doesn't have the 'lat' and 'lng' values, the scheduler will make an attempt to resolve coordinates based on the
'event_location' value while loading events to the scheduler. If the specified location will
be identified, the corresponding coordinates will be saved in the DB. If not, the scheduler will fire the [onLocationError](api/event/onlocationerror.md) event.
- Enabling the property is useful for migration, but not for the production stage.
