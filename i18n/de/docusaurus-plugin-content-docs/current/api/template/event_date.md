---
sidebar_label: "event_date"
title: "event_date template"
description: "definiert den Zeitanteil der Start- und Enddaten eines Events. Es wird hauptsächlich von anderen Templates verwendet, um Zeitintervalle anzuzeigen."
---

# event_date

### Description

@short: Definiert den Zeitanteil der Start- und Enddaten eines Events. Es wird hauptsächlich von anderen Templates verwendet, um Zeitintervalle anzuzeigen.

@signature: event_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - das Datum, das formatiert werden muss

### Returns
- ` text` - (string) - HTML-Text zur Darstellung im Scheduler

### Example

~~~jsx
scheduler.templates.event_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
    return formatFunc(date);
}
~~~

### Related Guides
- [Allgemeine Vorlagen](guides/common-templates.md#lightbox)
