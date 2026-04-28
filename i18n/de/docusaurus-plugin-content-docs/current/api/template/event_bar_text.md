---
sidebar_label: event_bar_text
title: "event_bar_text Vorlage"
description: "legt den Text des Ereignisses fest. Gilt nur für Mehrtages-Ereignisse"
---

# event_bar_text

### Description

@short: Legt den Text des Ereignisses fest. Gilt nur für Mehrtages-Ereignisse

@signature: event_bar_text: (start: Date, end: Date, event: any) => string

### Parameters

- `start` - (erforderlich) *Date* - das Datum, an dem ein Ereignis beginnen soll
- `end` - (erforderlich) *Date* - das Datum, an dem das Ereignis voraussichtlich abgeschlossen wird
- `event` - (erforderlich) *object* - das Objekt des Ereignisses

### Returns
- `text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.event_bar_text = (start, end, event) => {
    return event.text;
};
~~~

**Verfügbare Ansichten:** [Monatsansicht](views/month.md), [Timeline-Ansicht](views/timeline.md)

### Related Guides
- [Monatsansicht-Vorlagen](views/month-view-templates.md)
- [Timeline-Ansicht-Vorlagen](views/timeline-view-templates.md)