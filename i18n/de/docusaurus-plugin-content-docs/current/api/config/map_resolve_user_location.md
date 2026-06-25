---
sidebar_label: "map_resolve_user_location"
title: "map_resolve_user_location config"
description: "Steuert, ob Benutzer aufgefordert werden, ihren Standort für die Anzeige auf der Karte freizugeben"
---

# map_resolve_user_location

### Description

@short: Steuert, ob Benutzer aufgefordert werden, ihren Standort für die Anzeige auf der Karte freizugeben

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
 Die Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Die **resolve_user_location** Einstellung kann auch innerhalb des [map_settings](api/config/map_settings.md) Konfigurationsobjekts definiert werden.

Bestimmte Browser bieten die Option, auf den Standort des Benutzers zuzugreifen. Wenn diese Option auf *true* gesetzt ist, wird der Benutzer beim Laden der Karte aufgefordert, seinen Standort freizugeben.
