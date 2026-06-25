---
sidebar_label: event_text
title: "event_text Vorlage"
description: "legt den Text des Ereignisses fest"
---

# event_text

### Description

@short: Legt den Text des Ereignisses fest

@signature: event_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem ein Ereignis beginnen soll
- `end` - (erforderlich) *Date* - das Datum, an dem ein Ereignis beendet werden soll
- `event` - (erforderlich) *object* - das Ereignisobjekt

### Returns
- `text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.event_text = (start, end, event) => {
    return `<a href='http://some.com/details.php?for=${event.id}'>${event.text}</a>`;
};
~~~

**Applicable views:** [Tagesansicht](views/day.md), [Wochenansicht](views/week.md), [Einheitenansicht](views/units.md)

### Related samples
- [Styling von Ereignissen mit Templates](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)

### Details

Beachten Sie, dass für Monats- und Timeline-Ansichten das [`event_bar_text`](api/template/event_bar_text.md) Template verwendet werden muss, um den Text des Ereignisses festzulegen.

### Related Guides
- [Templates der Tagesansicht](views/day-view-templates.md)