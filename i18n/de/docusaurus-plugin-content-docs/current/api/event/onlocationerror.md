---
sidebar_label: "onLocationError"
title: "onLocationError event"
description: "Wird ausgelöst, wenn der Standort eines Events auf der Karte nicht gefunden werden kann (nur Map-Ansicht)"
---

# onLocationError

### Description

@short: Wird ausgelöst, wenn der Standort eines Events auf der Karte nicht gefunden werden kann (nur Map-Ansicht)

@signature: onLocationError: (id: string) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

### Example

~~~jsx
// Dieser Handler setzt die Koordinaten des Greenwich Royal Observatory 
// immer dann, wenn der Standort für ein Event nicht bestimmt werden kann

scheduler.attachEvent("onLocationError", function (id){
    alert("Standort kann nicht gefunden werden");
    return google.maps.LatLng(51.477840, -0.001492); 
    // Koordinaten des Greenwich Royal Observatory
});
~~~

### Details

:::note

Dieses Event wird nur ausgelöst, wenn die Konfigurationseigenschaft [map_resolve_event_location](api/config/map_resolve_event_location.md) aktiviert ist.
 
:::

<br>

**Wie funktioniert das Event?**

- Wenn ein Event in der Datenbank keine 'lat' und 'lng' Werte besitzt, versucht der Scheduler beim Laden der Events, diese aus dem Wert 'event_location' aufzulösen. Wenn der Standort identifiziert wird, werden die Koordinaten in der Datenbank gespeichert. Wenn nicht, wird das **onLocationError** Event ausgelöst.
- Die Konfigurationseigenschaft [map_resolve_event_location](api/config/map_resolve_event_location.md) ist hauptsächlich für Migrationszwecke gedacht und nicht für den produktiven Einsatz.
- Dieses Event gilt nur für Events, die aus der Datenbank geladen werden.

Dieses Event ermöglicht es, Fälle zu behandeln, in denen der Scheduler auf ein Event mit einem ungültigen oder fehlenden Standort stößt. Zum Beispiel kann es ein **google.maps.LatLng** Objekt mit Ersatzkoordinaten zurückgeben, das dem Event bei einem Fehler zugewiesen wird.
