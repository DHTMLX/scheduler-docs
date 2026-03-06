---
sidebar_label: "map_info_content"
title: "map_info_content template"
description: "definiert, was im Info-Fenster in der Map View angezeigt wird"
---

# map_info_content

### Description

@short: Definiert, was im Info-Fenster in der Map View angezeigt wird

@signature: map_info_content: (event: any) =\> void

### Parameters

- `event` - (required) *object* - das Event-Objekt

### Example

~~~jsx
scheduler.templates.map_info_content = function(event){
    const formatDate = scheduler.templates.tooltip_date_format;
    return `<div><b>Event's text:</b> ${event.text}
        <div><b>Location:</b> ${event.event_location}</div>
        <div><b>Starts:</b> ${formatDate(event.start_date)}</div>
        <div><b>Ends:</b> ${formatDate(event.end_date)}</div>
    </div>`;
};
~~~

### Details

Dieses Template legt den Inhalt des [InfoWindow](https://developers.google.com/maps/documentation/javascript/infowindows) Popups fest, das erscheint, wenn man auf einen Event-Marker in der Map View klickt.

Es ersetzt die älteren Templates `scheduler.templates.marker_text` und `scheduler.templates.marker_date`, die in Scheduler Version 7.1 entfernt wurden.

### Related Guides
- [Kartenansicht](views/map.md)

### Change log
- Hinzugefügt in Version 7.1
