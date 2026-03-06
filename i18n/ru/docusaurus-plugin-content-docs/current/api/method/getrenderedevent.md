---
sidebar_label: "getRenderedEvent"
title: "getRenderedEvent method"
description: "возвращает HTML-элемент события, который в данный момент отображается"
---

# getRenderedEvent

### Description

@short: Возвращает HTML-элемент события, который в данный момент отображается

@signature: getRenderedEvent: (id: string) =\> HTMLElement

### Parameters

- `id` - (required) *string* - id события

### Returns
- `event` - (HTMLElement) - **HTML-элемент события** - если событие видно в scheduler. <br> **'null'** - если событие не отображается в scheduler в момент вызова метода.

### Example

~~~jsx
var eventId = scheduler.addEvent({
    start_date: "16-05-2013 09:00",
    end_date:   "16-05-2013 12:00",
    text:   "Meeting"
});
var eventObj = scheduler.getRenderedEvent(eventId);
//-> <div event_id="123649234723" ...>09:00 Meeting</div>
~~~

### Details

:::note

Доступно начиная с версии 3.5
 
:::
