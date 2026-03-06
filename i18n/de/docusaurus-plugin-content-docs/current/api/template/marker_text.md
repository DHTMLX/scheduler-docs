---
sidebar_label: "marker_text"
title: "marker_text template"
description: "liefert den Text, der im Google Maps Popup-Marker für ein Event angezeigt wird"
---

# marker_text
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Liefert den Text, der im Google Maps Popup-Marker für ein Event angezeigt wird

### Parameters

- `start` - (required) *Date* - das Datum, an dem das Event beginnt   
- `end` - (required) *Date* - das Datum, an dem das Event endet
- `event` - (required) *object* - die Event-Details

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.marker_text = function(start,end,ev){
     return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + 
     "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + 
     scheduler.templates.marker_date(end) + "</div>";
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
