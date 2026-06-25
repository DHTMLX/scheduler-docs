---
sidebar_label: "getView"
title: "getView method"
description: "gibt ein View-Objekt basierend auf seinem Namen zurück. Wird kein Name angegeben, wird die aktuelle View zurückgegeben"
---

# getView

### Description

@short: Gibt ein View-Objekt basierend auf seinem Namen zurück. Wird kein Name angegeben, wird die aktuelle View zurückgegeben

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - optionale Angabe, der Name der View

### Returns
- ` view` - (object) - ein View-Objekt

### Example

~~~jsx
const timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

Diese Methode gibt nur Views zurück, die eine eigene Objekt-Repräsentation besitzen. Derzeit gehören dazu die [timeline](views/timeline.md#timeline-object-api) und [units](views/units.md) Views; für alle anderen Views gibt die Methode *null* zurück.

### Related Guides
- [Timeline-Ansicht](views/timeline.md)
- [Units-Ansicht](views/units.md)
