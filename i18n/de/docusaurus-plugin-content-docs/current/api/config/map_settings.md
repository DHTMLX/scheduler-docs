---
sidebar_label: "map_settings"
title: "map_settings config"
description: "enthält Konfigurationsoptionen im Zusammenhang mit der Karte"
---

# map_settings

### Description

@short: Enthält Konfigurationsoptionen im Zusammenhang mit der Karte

@signature: map_settings: any

### Example

~~~jsx
// dieses Beispiel zeigt die Standard-Karteneinstellungen
scheduler.config.map_settings = {
    initial_position: {
       lat: 48.724,
       lng: 8.215
    },
    error_position: {
       lat: 15,
       lng: 15
    },
    initial_zoom: 1,
    zoom_after_resolve: 15,
    info_window_max_width: 300,
    resolve_user_location: true,
    resolve_event_location: true,
    view_provider: "googleMap"
}
...
scheduler.init('scheduler_here',new Date(2024,05,11),"map");
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Das Konfigurationsobjekt enthält folgende Eigenschaften:

- **initial_position** - definiert die Startposition der Karte
- **error_position** - definiert die Ersatzposition, die angezeigt wird, wenn der Standort eines Events nicht ermittelt werden kann
- **initial_zoom** - legt die Zoomstufe fest, wenn die Map-Ansicht zum ersten Mal geladen wird
- **zoom_after_resolve** - bestimmt die Zoomstufe, die verwendet wird, um den Standort des Benutzers anzuzeigen, wenn die Erlaubnis erteilt wurde
- **info_window_max_width** - legt die maximale Breite für das Popup-Marker-Fenster auf der Karte fest
- **resolve_user_location** - steuert Aufforderungen, die den Benutzer bitten, seinen Standort für die Anzeige auf der Karte freizugeben
- **resolve_event_location** - aktiviert Versuche, den Standort eines Events zu ermitteln, falls dessen Koordinaten nicht in der Datenbank gespeichert sind
- **view_provider** - wählt den Kartenanbieter aus

Benutzerdefinierte Karteneinstellungen können innerhalb des **map_settings** Objekts hinzugefügt werden, z. B. Tokens:

~~~js
scheduler.config.map_settings.accessToken = "pk.eyJ...";
~~~

### Change log
- Hinzugefügt in v7.1
