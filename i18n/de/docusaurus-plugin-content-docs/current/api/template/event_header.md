---
sidebar_label: "event_header"
title: "event_header template"
description: "definiert den Header-Inhalt für ein Event"
---

# event_header

### Description

@short: Definiert den Header-Inhalt für ein Event

@signature: event_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Datum, an dem das Event beginnt   
- `end` - (required) *Date* - Das Datum, an dem das Event endet
- `event` - (required) *object* - Das Datenobjekt des Events

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
- [Week-View-Vorlagen](views/week-view-templates.md)
