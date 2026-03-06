---
sidebar_label: "TIMELINE_scale_date"
title: "TIMELINE_scale_date template"
description: "definiert die auf der X-Achse angezeigten Elemente"
---

# TIMELINE_scale_date
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die auf der X-Achse angezeigten Elemente

@signature: TIMELINE_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - das zu formatierende Datum

### Returns
- ` text` - (string) - HTML-Inhalt zur Anzeige im Scheduler

### Example

~~~jsx
scheduler.templates.timeline_scale_date = function(date){
   var timeline = scheduler.matrix.timeline;
   var func = scheduler.date.date_to_str(timeline.x_date||scheduler.config.hour_date);
   return func(date);
}
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Vorlage erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
