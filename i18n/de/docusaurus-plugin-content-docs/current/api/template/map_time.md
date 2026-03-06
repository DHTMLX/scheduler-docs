---
sidebar_label: "map_time"
title: "map_time template"
description: "legt das Datum fest, das in der ersten Spalte der Ansicht angezeigt wird"
---

# map_time

### Description

@short: Legt das Datum fest, das in der ersten Spalte der Ansicht angezeigt wird

@signature: map_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem ein Ereignis beginnt   
- `end` - (required) *Date* - das Datum, an dem ein Ereignis endet
- `event` - (required) *object* - das Ereignisobjekt

### Returns
- ` text` - (string) - HTML-Text, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.map_time = function(start,end,ev){
    if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
        return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 Die Vorlage erfordert, dass das [map_view](guides/extensions-list.md#map-view) Plugin aktiviert ist. 
:::

### Related Guides
- [Map-Ansichtsvorlagen](views/map-view-templates.md)
