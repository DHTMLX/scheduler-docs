---
sidebar_label: "changeEventId"
title: "changeEventId method"
description: "обновляет id события"
---

# changeEventId

### Description

@short: Обновляет id события

@signature: changeEventId: (id: string, new_id: string) =\> void

### Parameters

- `id` - (required) *string* - текущий id события
- `new_id` - (required) *string* - новый id события

### Example

~~~jsx
scheduler.changeEventId("ev15", "ev25"); // обновляет id события с "ev15" на "ev25"
~~~

### Details

Каждое событие, отображаемое в scheduler, имеет уникальный id.

Когда новое событие создаётся через UI, библиотека Scheduler присваивает ему временный id.

После того, как событие сохраняется в базе данных, оно получает постоянный id, сгенерированный базой данных. 
Обычно ваш backend возвращает этот id из базы на клиентскую сторону, где scheduler его принимает и использует для любых последующих обновлений события.

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
        // ответ backend после вставки нового события в базу
        scheduler.changeEventId(event.id, result.databaseId);
    }
});
~~~

Учтите, что этот метод вызывает событие [onEventIdChange](api/event/oneventidchange.md).

### Related API
- [onEventIdChange](api/event/oneventidchange.md)

### Related Guides
- [Интеграция с серверной стороной](guides/server-integration.md#technique)
