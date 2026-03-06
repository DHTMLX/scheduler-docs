---
sidebar_label: "event_text"
title: "event_text template"
description: "definiert den Text, der für ein Event angezeigt wird"
---

# event_text

### Description

@short: Definiert den Text, der für ein Event angezeigt wird

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - Das Startdatum des Events   
- `end` - (required) *Date* - Das Enddatum des Events
- `event` - (required) *object* - Das Event-Datenobjekt

### Returns
- ` text` - (string) - HTML-Inhalt, der zur Anzeige des Events im Scheduler verwendet wird

### Example

~~~jsx
scheduler.templates.event_text=function(start, end, event){
    return "<a href='http://some.com/details.php?for="+event.id+"'>"
    +event.text+"</a>";
}
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Beachten Sie, dass für die Month- und Timeline-Views das Template [event_bar_text](api/template/event_bar_text.md) verwendet werden sollte, um den Text des Events festzulegen.

### Related Guides
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
