---
sidebar_label: "event_bar_text"
title: "event_bar_text template"
description: "Legt den Text fest, der bei mehrtägigen Events angezeigt wird."
---

# event_bar_text

### Description

@short: Legt den Text fest, der bei mehrtägigen Events angezeigt wird.

@signature: event_bar_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Datum, an dem das Event beginnt  
- `end` - (required) *Date* - Das Datum, an dem das Event endet
- `event` - (required) *object* - Das Event-Objekt

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.event_bar_text = function(start,end,event){
      return event.text;
};
~~~

**Applicable views:** [Month view](views/month.md), [Timeline view](views/timeline.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Timeline-Ansichtsvorlagen](views/timeline-view-templates.md)
