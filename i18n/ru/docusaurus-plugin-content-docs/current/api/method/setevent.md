---
sidebar_label: "setEvent"
title: "setEvent method"
description: "добавляет новое событие в пул данных планировщика"
---

# setEvent

### Description

@short: Добавляет новое событие в пул данных планировщика

@signature: setEvent: (id: string | number, event: any) =\> void

### Parameters

- `id` - (required) *string | number* -     идентификатор события
- `event` - (required) *object* - объект события

### Example

~~~jsx
scheduler.setEvent(1, {
    start_date: new Date(2013, 05, 16, 09, 00),
    end_date:   new Date(2013, 05, 16, 12, 00),
    text:   "Meeting",
    holder: "John", 
    room:   "5"     
});
scheduler.setCurrentView();
~~~

### Details

Этот метод работает аналогично [addEvent](api/method/addevent.md).

Ключевое отличие между **setEvent()** и **addEvent()** заключается в следующем:

- Метод [addEvent](api/method/addevent.md) добавляет событие в отображение планировщика и вызывает события [onEventAdded](api/event/oneventadded.md) / [onEventChanged](api/event/oneventchanged.md), которые могут использоваться для обновления исходного источника данных (например, базы данных).
- Метод **setEvent()** просто добавляет событие во внутренний пул данных без вызова каких-либо событий. Чтобы обновить отображение планировщика с новым событием, необходимо отдельно вызвать [setCurrentView](api/method/setcurrentview.md).

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [addEvent](api/method/addevent.md)
- [onEventAdded](api/event/oneventadded.md)
- [onEventChanged](api/event/oneventchanged.md)

### Related Guides
- [Добавление/Удаление событий](guides/adding-events.md)
