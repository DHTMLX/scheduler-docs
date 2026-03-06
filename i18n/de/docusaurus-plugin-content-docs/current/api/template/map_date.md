---
sidebar_label: "map_date"
title: "map_date template"
description: "setzt das im Header der Ansicht angezeigte Datum"
---

# map_date

### Description

@short: Setzt das im Header der Ansicht angezeigte Datum

@signature: map_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - das Anfangsdatum der Ansicht
- `end` - (required) *Date* - das Enddatum der Ansicht

### Returns
- ` text` - (string) - HTML-Text für die Darstellung im Scheduler

### Example

~~~jsx
//Standarddefinition
scheduler.templates.map_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
