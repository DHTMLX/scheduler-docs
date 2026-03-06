---
sidebar_label: "map_text"
title: "map_text template"
description: "definiert den Text, der in der zweiten Spalte der Ansicht angezeigt wird"
---

# map_text

### Description

@short: Definiert den Text, der in der zweiten Spalte der Ansicht angezeigt wird

@signature: map_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem ein Ereignis beginnt   
- `end` - (required) *Date* - das Datum, an dem ein Ereignis voraussichtlich endet
- `event` - (required) *object* - das Ereignisobjekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.map_text = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Die Vorlage erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

Beachte, dass wenn die [map_text](api/template/map_text.md) Vorlage nicht definiert ist, der Datumsanteil ('d-m-y'), der im Google Maps Popup-Marker angezeigt wird, das Format der [day_date](api/template/day_date.md) Vorlage übernimmt.

### Related Guides
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
