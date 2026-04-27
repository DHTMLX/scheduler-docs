---
sidebar_label: getRenderedEvent
title: "getRenderedEvent method"
description: "возвращает объект текущего отображаемого события"
---

# getRenderedEvent

### Description

@short: Возвращает объект текущего отображаемого события

@signature: getRenderedEvent: (id: string) => HTMLElement

### Parameters

- `id` - (required) *string* - идентификатор события

### Returns
- `event` - (HTMLElement) - **HTML-объект события** - если событие в данный момент отображается в планировщике. <br> **'null'** - если событие не отображается в планировщике на момент вызова метода.

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

Доступно начиная с версии 3.5
 
:::