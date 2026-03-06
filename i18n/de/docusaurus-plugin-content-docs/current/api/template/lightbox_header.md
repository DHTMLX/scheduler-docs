---
sidebar_label: "lightbox_header"
title: "lightbox_header template"
description: "definiert den Header-Bereich der lightbox"
---

# lightbox_header

### Description

@short: Definiert den Header-Bereich der lightbox

@signature: lightbox_header: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - das Startdatum des Ereignisses   
- `end` - (required) *Date* - das Enddatum des Ereignisses
- `event` - (required) *object* - das Ereignisobjekt selbst

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.lightbox_header = function(start,end,ev){
    return scheduler.templates.event_header(ev.start_date,ev.end_date,ev) 
    + scheduler.templates.event_bar_text(ev.start_date,ev.end_date,ev);
};
~~~

### Details

Wenn das [lightbox_header](api/template/lightbox_header.md) Template nicht definiert ist, wird der Datumsanteil des Headers standardmäßig im Format des [event_header](api/template/event_header.md) Templates angezeigt.

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#lightbox)
