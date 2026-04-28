---
sidebar_label: changeEventId
title: "Метод changeEventId"
description: "изменяет id события"
---

# changeEventId

### Description

@short: Изменяет id события

@signature: changeEventId: (id: string, new_id: string) =\> void

### Parameters

- `id` - (required) *string* - текущее id события
- `new_id` - (required) *string* - новое id события

### Example

~~~jsx
scheduler.changeEventId("ev15", "ev25"); // changes the event's id "ev15" -> "ev25"
~~~

### Details

Каждое событие, отображаемое в планировщике, имеет уникальное значение id.

Когда новое событие создаётся через UI, ему присваивается временный id, генерируемый библиотекой Scheduler.

После добавления события в базу данных оно получает постоянный id, генерируемый базой данных. 
Обычный сценарий таков: ваш обработчик на стороне сервера возвращает id базы данных на клиентскую сторону, где scheduler подхватывает его и использует для дальнейших обновлений события.

Если вы используете [dataProcessor модуль и следуете руководствам по серверной интеграции](guides/server-integration.md#technique), этот процесс происходит автоматически.
Но если вы отправляете обновления на backend вручную, вам нужно обновлять id события вручную с помощью этого метода.
Например:

~~~js
// создаём новое событие
jQuery.ajax({
    type:"POST",
    url:"/myApi/event",
    data:{ data : event },
    complete:function(result){
        // ответ бэкэнда после вставки нового события в базу данных
        scheduler.changeEventId(event.id, result.databaseId);
    }
});
~~~

Примечание: метод вызывает событие [onEventIdChange](api/event/oneventidchange.md).

### Related API
- [onEventIdChange](api/event/oneventidchange.md)

### Related Guides
- [Серверная интеграция](guides/server-integration.md#technique)