---
sidebar_label: "GRID_full_date"
title: "GRID_full_date template"
description: "definiert, wie Daten in Spalten mit der id='date' angezeigt werden"
---

# GRID_full_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert, wie Daten in Spalten mit der id='date' angezeigt werden

@signature: GRID_full_date: (start: Date, end: Date, ev: object) =\> string;

### Parameters

- `start` - (required) *Date* - das Startdatum eines Ereignisses  
- `end` - (required) *Date* - das Enddatum eines Ereignisses
- `ev` - (required) *object* - die Ereignisdetails

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.grid_full_date = function(start,end,event){
    if (scheduler.isOneDayEvent(event))
        return scheduler.templates.grid_single_date(start);
    else
        return scheduler.templates.day_date(start)+" &ndash; "
           +scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 Diese Vorlage setzt voraus, dass das [grid_view](guides/extensions-list.md#grid-view) Plugin aktiviert ist. 
:::

### Related API
- [GRID_single_date](api/template/gridname_single_date.md)

### Related Guides
- [Grid-View-Vorlagen](views/grid-view-templates.md)
