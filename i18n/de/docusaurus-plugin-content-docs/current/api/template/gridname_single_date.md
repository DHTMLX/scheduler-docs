---
sidebar_label: "GRID_single_date"
title: "GRID_single_date template"
description: "definiert, wie Daten in Spalten mit der ID 'start_date' oder 'end_date' angezeigt werden"
---

# GRID_single_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert, wie Daten in Spalten mit der ID 'start_date' oder 'end_date' angezeigt werden

@signature: GRID_single_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden soll

### Returns
- ` text` - (string) - HTML-Text, der zur Darstellung des Schedulers verwendet wird

### Example

~~~jsx
scheduler.templates.grid_single_date = function(date){
    return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Diese Vorlage funktioniert, wenn das [grid_view](guides/extensions-list.md#grid-view) Plugin aktiviert ist. 
:::

### Related API
- [GRID_full_date](api/template/gridname_full_date.md)

### Related Guides
- [Grid-View-Vorlagen](views/grid-view-templates.md)
