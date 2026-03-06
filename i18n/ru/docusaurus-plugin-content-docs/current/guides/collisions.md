---
title: "Предотвращение двойных событий в одном временном слоте"
sidebar_label: "Предотвращение двойных событий в одном временном слоте"
---

# Предотвращение двойных событий в одном временном слоте

Во многих сценариях важно ограничить количество событий, которые могут быть запланированы в одном временном слоте. Например, может потребоваться запретить добавление второго события, если на это время уже запланировано другое.

## Активация контроля коллизий

Для управления количеством событий, разрешённых в одном временном слоте, можно использовать расширение [**collision**](guides/extensions-list.md#collision).

~~~js title="Активация расширения 'collision'"
scheduler.plugins({
    collision: true
});
~~~

*После активации этого расширения на странице включается функциональность, предотвращающая размещение двух событий в одном временном слоте - как при создании новых событий, так и при перемещении существующих.*

## Управление допустимым количеством событий в одном слоте

По умолчанию в одном временном слоте разрешено только одно событие. Чтобы изменить этот лимит, используйте свойство [collision_limit](api/config/collision_limit.md):

~~~js title="Запрет создания более 2 событий в одном временном слоте"
scheduler.config.collision_limit = 2;      //разрешает создание 2 событий в одном временном слоте
~~~

[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


*При активном расширении ['collision'](guides/extensions-list.md#collision), когда пользователь пытается добавить или переместить событие во временной слот, в котором уже есть события, планировщик вызывает событие [onEventCollision](api/event/oneventcollision.md). Это событие проверяет лимит, заданный в свойстве [collision_limit](api/config/collision_limit.md).*


Обратите внимание, что событие [onEventCollision](api/event/oneventcollision.md) не срабатывает при загрузке данных. Чтобы обеспечить соблюдение лимита событий при загрузке данных, код необходимо немного доработать:

~~~js title="Запрет создания/загрузки более 2 событий в одном временном слоте"
scheduler.config.collision_limit = 2; //разрешает создание 2 событий в одном временном слоте
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~
Метод [checkCollision](api/method/checkcollision.md) проверяет, пересекается ли событие с уже существующими, и при необходимости вызывает событие [onEventCollision](api/event/oneventcollision.md).

## Получение количества событий в временном слоте

Чтобы узнать, сколько событий запланировано в определённом временном слоте, можно использовать метод [getEvents](api/method/getevents.md):

~~~js title="Получение количества событий в временном слоте"
var count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

Обратите внимание, что метод [getEvents](api/method/getevents.md) перебирает все события и сравнивает их даты, поэтому при очень большом количестве событий эта операция может занять некоторое время.

## Полный чек-лист по предотвращению двойных бронирований/событий

Вот краткое описание шагов, которые нужно выполнить, чтобы предотвратить коллизии событий в одном временном слоте:

1) Подключите расширение *collision* на страницу:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) Запретите пользователям создавать новые события во время загрузки данных с сервера.

Это гарантирует, что события не будут добавлены до полной загрузки календаря. Используйте обработчики событий [onLoadEnd](api/event/onloadend.md) и [onLoadStart](api/event/onloadstart.md) вместе со свойством [readonly](api/config/readonly.md), например:

~~~js
// сделать планировщик только для чтения
// до начала загрузки данных из источника
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// сделать планировщик редактируемым
// только после завершения загрузки данных из источника
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) Включите динамическую загрузку для повышения производительности при работе с большим количеством записей, которые иначе загружались бы одновременно.

Чтобы активировать динамическую загрузку, вызовите метод [setLoadMode](api/method/setloadmode.md) до загрузки данных:

~~~js title="Включение динамической загрузки"
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) Валидируйте конфликтующие события на сервере с помощью проверки через PHP connector. Подробнее смотрите в статье о 
[data validation](https://docs.dhtmlx.com/connector__php__validation.html#processingincaseofvalidationerror).

Если валидация не пройдена, можно перезагрузить данные на клиенте.

Для обработки ошибок валидации используйте события DataProcessor [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html) и 
[onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html), а также методы планировщика [clearAll](api/method/clearall.md) и [load](api/method/load.md):

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

Вызывается после возникновения ошибки валидации, до отправки данных:

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //перезагрузить актуальные данные с сервера
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

Параметры:

- id - (string) id элемента с ошибкой
- details - (object) детали ошибки

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

Вызывается после обработки ответа сервера:

~~~js
dp.attachEvent("onAfterUpdate", function(id, action, tid, response){
     if(action == "invalid" || action == "error"){
          //перезагрузить актуальные данные с сервера
          scheduler.clearAll();
          scheduler.load("/data");
     }
});
~~~

Параметры:

- id - (string)    id обновлённого элемента
- action - (string)    статус ответа (тип операции), см. детали ниже
- tid - (string) новый id (актуально только для операций вставки)
- response - (mixed) xml node/json объект с разобранным ответом

Возможные статусы ответа:

- updated; 
- inserted;
- deleted;
- invalid;
- error.
