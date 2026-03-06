---
sidebar_label: "TIMELINE_cell_value"
title: "TIMELINE_cell_value template"
description: "zeigt an, wie viele Events innerhalb einer Zelle der Ansicht geplant sind"
---

# TIMELINE_cell_value
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Zeigt an, wie viele Events innerhalb einer Zelle der Ansicht geplant sind

@signature: TIMELINE_cell_value: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - ein Array, das Event-Objekte innerhalb der Zelle enthält
- `date` - (required) *Date* - das Datum, das der Zelle entspricht
- `section` - (required) *object* - das Section-Objekt

### Returns
- ` text` - (string) - HTML-Text, der für das Rendering im Scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.timeline_cell_value = function(evs, date, section){
    return evs?evs.length:"";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Die Template-Funktion erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

:::note

Standardmäßig wird dieses Template nur im 'cell'-Modus der Timeline-Ansicht ausgelöst. Wenn jedoch die **cell_template** Option der [Timeline-Ansicht](api/method/createtimelineview.md) aktiviert ist, wird das Template auch in [allen anderen Modi der Ansicht](views/timeline.md#custom-content-in-cells) aufgerufen.
 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
