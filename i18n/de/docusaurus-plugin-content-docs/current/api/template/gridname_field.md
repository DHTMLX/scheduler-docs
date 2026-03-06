---
sidebar_label: "GRID_field"
title: "GRID_field template"
description: "definiert den Text, der in den Spalten angezeigt wird"
---

# GRID_field
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert den Text, der in den Spalten angezeigt wird

@signature: GRID_field: (field_name: string, event: object) =\> string;

### Parameters

- `field_name` - (required) *string* - die Kennung der Spalte  
- `event` - (required) *object* - die Event-Daten

### Returns
- ` text` - (string) - HTML-Inhalt zur Anzeige im Scheduler

### Example

~~~jsx
scheduler.templates.grid_field = function(field_name, event){
    return event[field_name];
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [grid_view](guides/extensions-list.md#grid-view) Plugin aktiviert ist. 
:::

Beachte, dass diese Vorlage nicht für Spalten mit id='date', id='start_date' oder id='end_date' gilt. Diese Spalten verwenden stattdessen die [GRID_full_date](api/template/gridname_full_date.md) und [GRID_single_date](api/template/gridname_single_date.md) Vorlagen.

### Related Guides
- [Grid-View-Vorlagen](views/grid-view-templates.md)
