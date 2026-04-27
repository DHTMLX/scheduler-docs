---
sidebar_label: "getRenderedEvent"
title: "getRenderedEvent method"
description: "gibt das HTML-Element des aktuell angezeigten Events zurück"
---

# getRenderedEvent

### Description

@short: Gibt das HTML-Element des aktuell angezeigten Events zurück

@signature: getRenderedEvent: (id: string) =\> HTMLElement

### Parameters

- `id` - (required) *string* - die ID des Events

### Returns
- `event` - (HTMLElement) - **das HTML-Element des Events** - wenn das Event im Scheduler sichtbar ist. <br> **'null'** - wenn das Event zum Zeitpunkt des Methodenaufrufs im Scheduler nicht sichtbar ist.

### Example

~~~jsx
const eventId = scheduler.addEvent({
    start_date: "16-05-2027 09:00",
    end_date:   "16-05-2027 12:00",
    text:   "Meeting"
});
const eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>
~~~

### Details

:::note
  
Verfügbar ab Version 3.5 
 
:::
