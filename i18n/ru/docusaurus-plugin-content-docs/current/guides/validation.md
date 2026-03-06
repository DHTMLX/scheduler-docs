---
title: "Валидация"
sidebar_label: "Валидация"
---

# Валидация

Валидация помогает убедиться, что данные, вводимые пользователями, корректны, и предотвращает сохранение неверных значений. Например, это может не позволить создать событие без описания.

Обычно валидация данных осуществляется с помощью событий из [dhtmlxScheduler API](api/overview/events_overview.md), которые фиксируют пользовательский ввод и позволяют проверить его корректность:

## Валидация на клиенте

Вот некоторые ключевые события, которые часто используются для валидации данных:

- [onEventSave](api/event/oneventsave.md) - срабатывает, когда пользователь нажимает кнопку 'Save' в lightbox
- [onBeforeEventCreated](api/event/onbeforeeventcreated.md) - срабатывает перед добавлением нового события в Scheduler
- [onBeforeEventChanged](api/event/onbeforeeventchanged.md) - срабатывает перед обновлением события

Простой способ выполнить валидацию - использовать событие [onEventSave](api/event/oneventsave.md). Это событие происходит при нажатии кнопки 'Save' в форме. Возврат *true* позволяет сохранить изменения, а возврат *false* отменяет сохранение и оставляет lightbox открытым.

Например, чтобы не допустить сохранения события без описания или с слишком коротким текстом, можно использовать следующий код:

~~~js
scheduler.attachEvent("onEventSave", function(id,ev){
    if (!ev.text) {
        dhtmlx.alert("Text must not be empty");
        return false;
    }
    if (ev.text.length < 20) {
        dhtmlx.alert("Text too small");
        return false;
    }
    return true;
});
~~~


[Validating lightbox fields](https://docs.dhtmlx.com/scheduler/samples/02_customization/08_validation.html)


## Валидация на сервере

Ограничение приведённого выше метода заключается в том, что событие не сработает, если изменения были внесены через inline-редактирование или с помощью перетаскивания внутри Scheduler.

Чтобы обработать все изменения - будь то редактирование, создание или удаление - используйте объект [dataProcessor](guides/server-integration.md), а именно его событие [onBeforeUpdate](https://docs.dhtmlx.com/api__dataprocessor_onbeforeupdate_event.html). Это событие срабатывает перед отправкой данных на сервер и охватывает любые изменения в Scheduler, а не только те, которые происходят в lightbox.

~~~js
scheduler.init("scheduler_here");
scheduler.load("data.php");
 
var dp = new gantt.dataProcessor("data.php");
dp.init(scheduler);

dp.attachEvent("onBeforeUpdate", function (id, status, data) {
    if (!data.text) {
        dhtmlx.message("The event's text can't be empty!");
        return false;
    }
    return true;
});
~~~

где:

- **id** - (*string*) идентификатор события.
- **status** - (*'updated', 'inserted', 'deleted'*) статус операции над событием.
- **data** - (*object*) данные для отправки.

Обратите внимание, что если валидация не проходит, изменения не отправляются на сервер, а остаются на стороне клиента, что позволяет при необходимости обработать их далее.
