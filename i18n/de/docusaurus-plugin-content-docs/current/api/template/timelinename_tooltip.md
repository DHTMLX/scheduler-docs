---
sidebar_label: "TIMELINE_tooltip"
title: "TIMELINE_tooltip template"
description: "liefert den Tooltip-Text für eine Tageszelle, die geplante Ereignisse enthält"
---

# TIMELINE_tooltip
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Liefert den Tooltip-Text für eine Tageszelle, die geplante Ereignisse enthält

@signature: TIMELINE_tooltip: (start: Date, end; date, event: object) =\> string;

### Parameters

- `start` - (required) *Date* - Das Datum, an dem ein Ereignis beginnt  
- `end` - (required) *Date* - Das Datum, an dem ein Ereignis endet
- `event` - (required) *object* - Das Ereignisobjekt

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler-Tooltip angezeigt wird

### Example

~~~jsx
scheduler.templates.timeline_tooltip = function(start,end,event){
    return event.text;
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 Diese Vorlage funktioniert nur, wenn das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

### Related Guides
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
