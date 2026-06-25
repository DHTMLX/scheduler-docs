---
sidebar_label: setEvent
title: "Метод setEvent"
description: "Добавляет новое событие в пул данных планировщика"
---

# setEvent

### Description

@short: Добавляет новое событие в пул данных планировщика

@signature: setEvent: (id: string | number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* - идентификатор события
- `event` - (required) *object* - объект события

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2027, 05, 16, 09, 00),
    end_date:   new Date(2027, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

Метод аналогичен [addEvent](api/method/addevent.md).

Разница между методами **setEvent()** и **addEvent()** состоит в следующем:

- [addEvent](api/method/addevent.md) рисует событие в планировщике и вызывает события [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md), которые могут обновлять данные в исходном источнике данных (например, база данных).
- Методу **setEvent()** не вызываются никакие события и просто добавляет событие в пул данных. Чтобы отрисовать событие в планировщике, следует дополнительно вызвать метод [setCurrentView](api/method/setcurrentview.md).

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- [Adding/Deleting Events](guides/adding-events.md)