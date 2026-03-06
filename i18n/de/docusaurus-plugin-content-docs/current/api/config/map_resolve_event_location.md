---
sidebar_label: "map_resolve_event_location"
title: "map_resolve_event_location config"
description: "ermöglicht automatische Versuche, den Standort eines Ereignisses zu bestimmen, wenn dessen Koordinaten noch nicht in der Datenbank gespeichert sind"
---

# map_resolve_event_location

### Description

@short: Ermöglicht automatische Versuche, den Standort eines Ereignisses zu bestimmen, wenn dessen Koordinaten noch nicht in der Datenbank gespeichert sind

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
 Diese Funktion erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Die **resolve_event_location** Option kann auch innerhalb des [map_settings](api/config/map_settings.md) Konfigurationsobjekts gesetzt werden.

- Wenn aktiviert (*true*), versucht der Scheduler beim Laden von Ereignissen, falls einem Ereignis keine 'lat' und 'lng' Werte in der Datenbank zugeordnet sind, die Koordinaten anhand des Feldes 'event_location' zu bestimmen. Wird der Standort erfolgreich ermittelt, werden die Koordinaten zurück in die Datenbank gespeichert. Andernfalls wird das [onLocationError](api/event/onlocationerror.md) Event ausgelöst.
- Diese Einstellung ist besonders hilfreich während einer Migration, wird aber im Allgemeinen nicht für den Einsatz in einer Produktionsumgebung empfohlen.
