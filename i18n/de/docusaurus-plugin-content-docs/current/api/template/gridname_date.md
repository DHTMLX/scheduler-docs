---
sidebar_label: "GRID_date"
title: "GRID_date template"
description: "setzt das im Header der Ansicht angezeigte Datum"
---

# GRID_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Setzt das im Header der Ansicht angezeigte Datum

@signature: GRID_date: (start: Date, end: Date) =\> string;

### Parameters

- `start` - (required) *Date* - der Anfangstermin der Ansicht
- `end` - (required) *Date* - der Endtermin der Ansicht

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
// Standarddefinition
scheduler.templates.grid_date = function(start, end){
    return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [grid_view](guides/extensions-list.md#grid-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Grid-View-Vorlagen](views/grid-view-templates.md)
