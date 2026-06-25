---
sidebar_label: event_class
title: "event_class Vorlage"
description: "Gibt die CSS-Klasse an, die dem Container des Events zugewiesen wird"
---

# event_class

### Description

@short: Legt die CSS-Klasse fest, die dem Container des Events zugewiesen wird

@signature: event_class: (start: Date, end: Date, ev: any) => string

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem ein Event voraussichtlich beginnt
- `end` - (erforderlich) *Date* - das Datum, an dem ein Event voraussichtlich abgeschlossen sein wird
- `ev` - (erforderlich) *object* - das Objekt des Events

### Returns
- `css_class` - (string) - die CSS-Klasse für das zugehörige Element

### Example

~~~jsx
scheduler.templates.event_class = (start, end, ev) => {
    return "";
};
~~~

**Applicable views:** [Day view](views/day.md), [Month view](views/month.md), [Week view](views/week.md), [Year view](views/year.md), [Units view](views/units.md), [Timeline view](views/timeline.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [Styling events with templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

In der Timeline-Ansicht wird die Vorlage nur auf die Modi 'Bar' und 'Tree' angewendet.

Check the full information about customizing event colors in the related article [Custom Event's Color](guides/custom-events-color.md).

### Related Guides
- [Custom Event's Color](guides/custom-events-color.md)
- [Day View Templates](views/day-view-templates.md)
- [Month View Templates](views/month-view-templates.md)