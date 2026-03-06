---
sidebar_label: "event_class"
title: "event_class template"
description: "definiert die CSS-Klasse, die dem Container des Events hinzugefügt wird"
---

# event_class

### Description

@short: Definiert die CSS-Klasse, die dem Container des Events hinzugefügt wird

@signature: event_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - Datum, an dem das Event beginnt   
- `end` - (required) *Date* - Datum, an dem das Event endet
- `ev` - (required) *object* - Das Event-Objekt

### Returns
- ` css_class` - (string) - CSS-Klasse für das entsprechende Element

### Example

~~~jsx
scheduler.templates.event_class = function(start,end,ev){
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Für die Timeline-Ansicht wird dieses Template nur in den Modi 'Bar' und 'Tree' verwendet.

Für detaillierte Anleitungen zur Anpassung der Event-Farben siehe den verwandten Artikel [Farbe für benutzerdefinierte Events](guides/custom-events-color.md).

### Related Guides
- [Farbe für benutzerdefinierte Events](guides/custom-events-color.md)
- [Day-Ansicht Vorlagen](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)
