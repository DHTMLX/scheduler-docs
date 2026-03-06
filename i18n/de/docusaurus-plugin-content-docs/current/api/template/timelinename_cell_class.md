---
sidebar_label: "TIMELINE_cell_class"
title: "TIMELINE_cell_class template"
description: "Legt die CSS-Klasse fest, die einer Zelle in der Ansicht zugewiesen wird."
---

# TIMELINE_cell_class
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Legt die CSS-Klasse fest, die einer Zelle in der Ansicht zugewiesen wird.

@signature: TIMELINE_cell_class: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - ein Array von Event-Objekten, die in einer Zelle enthalten sind (nur im 'cell'-Modus verfügbar)
- `date` - (required) *Date* - das Datum, das einer Spalte entspricht
- `section` - (required) *object* - das Section-Objekt

### Returns
- ` css_class` - (string) - die anzuwendende CSS-Klasse für das Element

### Example

~~~jsx
scheduler.templates.timeline_cell_class = function(evs, date, section){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Dieses Template erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
