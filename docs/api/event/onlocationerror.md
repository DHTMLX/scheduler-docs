---
sidebar_label: onLocationError
title: "onLocationError event"
description: "fires when the event location can't be found on the map (the Map view only)"
---

# onLocationError

### Description

@short: Fires when the event location can't be found on the map (the Map view only)

@signature: onLocationError: (id: string) =\> void

### Parameters

- `id` - (required) *string* - the event's id

### Example

~~~jsx
//With such a handler each time the location can be identified, scheduler will apply
//the coordinates of the Greenwich Royal Observatory to the event

scheduler.attachEvent("onLocationError", function (id){
    alert("Location can't be found");
    return google.maps.LatLng(51.477840, -0.001492); 
    //the coordinates of the Greenwich Royal Observatory
});
~~~

### Details

:::note

The event will fire only with the [map_resolve_event_location](api/config/map_resolve_event_location.md) configuration property enabled.
 
:::

<br>

**How does the event work?**

- If an event in the database doesn't have the 'lat' and 'lng' values, the scheduler will make an attempt to resolve them based on the
'event_location' value, while loading events to the scheduler. If the specified location will
be identified, the corresponding coordinates will be saved in the DB. If not, the scheduler will fire the **onLocationError** event.
- Enabling the the [map_resolve_event_location](api/config/map_resolve_event_location.md) configuration property is useful for migration, but not for production stage.
- The event will affect only the events which are loaded from DB.


The event can be used to provide custom reaction to the situation, when the scheduler tries to load an event with an invalid or empty location.<br> For example, it's possible to return a **google.maps.LatLng** object 
with geographical coordinates that will be applied to the event in case of error.
