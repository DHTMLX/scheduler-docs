---
sidebar_label: "marker_date"
title: "marker_date template"
description: "legt das Datum für das im Google Maps Popup-Marker angezeigte Ereignis fest"
---

# marker_date
:::warning
Die Funktion ist veraltet
:::
### Description

@short: Legt das Datum für das im Google Maps Popup-Marker angezeigte Ereignis fest

### Parameters

- `start` - (required) *Date* - das Startdatum des Ereignisses   
- `end` - (required) *Date* - das Enddatum des Ereignisses
- `event` - (required) *object* - das Ereignisobjekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.marker_date = function(date){
    return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
