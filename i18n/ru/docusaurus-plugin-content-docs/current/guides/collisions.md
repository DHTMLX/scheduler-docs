---
title: "Предотвращение двойных событий в временном интервале"
sidebar_label: "Предотвращение двойных событий в временном интервале"
---

# Предотвращение двойных событий в временном интервале

Во многих сценариях вам может понадобиться ограничить количество событий в пределах одного временного интервала. Например, может потребоваться запретить создание второго события, если другое событие уже определено в указанное время.

## Активация мониторинга конфликтов

Чтобы контролировать число событий в временном интервале, используйте расширение [**collision**](guides/extensions-list.md#collision).

Активация расширения 'collision':
~~~js
scheduler.plugins({
    collision: true
});
~~~

*Как только расширение будет включено на странице, оно активируется. С этого момента планировщик не позволит пользователям размещать 2 события в одном и том же временном интервале (создавать или перемещать).*

## Управление допустимым числом событий в временном интервале

По умолчанию допустимое число событий в временном интервале равно 1. Чтобы регулировать это число, используйте свойство [collision_limit](api/config/collision_limit.md):

[Контроль количества событий в временном интервале](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

*С включённым расширением ['collision'](guides/extensions-list.md#collision) каждый раз, когда пользователь пытается создать новое событие или изменить существующее внутри уже занятого временного интервала, планировщик вызывает событие [onEventCollision](api/event/oneventcollision.md), которое проверяет значение, установленное свойством [collision_limit](api/config/collision_limit.md).*

Но помните, событие [onEventCollision](api/event/oneventcollision.md) не вызывается во время загрузки данных. Поэтому, чтобы контролировать число элементов в временном интервале во время загрузки данных в планировщик, нужно слегка расширить предыдущий код:

[Denying creating/loading more than 2 events per time slot](Denying creating more than 2 events per time slot)
~~~js
scheduler.config.collision_limit = 2; //allows creating 2 events per time slot
scheduler.attachEvent("onEventLoading", function(ev){ /*!*/
    return scheduler.checkCollision(ev);             /*!*/
});                                                   /*!*/

~~~

Метод [checkCollision](api/method/checkcollision.md) проверяет, происходит ли событие в момент, который уже занят другим(и) событием(ями), и вызывает событие [onEventCollision](api/event/oneventcollision.md).

## Получение количества событий, размещённых в временном интервале

Чтобы получить число событий, размещённых в временном интервале, используйте метод [getEvents](api/method/getevents.md):

[Получение количества событий в временном интервале](Getting the number of events in a time slot)
~~~js
const count = scheduler.getEvents(ev.start_date, ev.end_date).length;
~~~

Примечание: метод [getEvents](api/method/getevents.md) перебирает все события и сравнивает их даты, поэтому может занять некоторое время, если у вас тысячи событий.

## Полный чек-лист по предотвращению двойных бронирований/событий

Ниже приведён список шагов, которые нужно выполнить, чтобы избежать коллизий событий в одном временном интервале:

1) Подключите на страницу расширение *collision*:

~~~js
scheduler.plugins({
    collision: true
});
~~~

2) Блокируйте создание новых событий во время загрузки данных с сервера.

Таким образом пользователь не сможет создать событие, пока данные не загружены и календарь пуст.

Для этого следует использовать обработчики событий [onLoadStart](api/event/onloadstart.md) и [onLoadEnd](api/event/onloadend.md) и свойство [readonly](api/config/readonly.md), как показано ниже:

~~~js
// сделать планировщик доступным для редактирования
// до начала загрузки данных из источника данных
scheduler.attachEvent("onLoadStart", function(){
    scheduler.config.readonly = true;
});

// сделать планировщик редактируемым
// только после завершения загрузки данных из источника
scheduler.attachEvent("onLoadEnd", function(){
    scheduler.config.readonly = false;
});
~~~

3) Включите динамическую загрузку, чтобы ускорить загрузку данных в случае большого объёма записей, если они загружаются сразу.

Чтобы включить динамическую загрузку, вызовите метод [setLoadMode](api/method/setloadmode.md) и затем загрузите скрипт:

[Включение динамической загрузки](Enabling the dynamic loading)
~~~js
scheduler.setLoadMode("month");
scheduler.load("/some");
~~~

4) Валидируйте конфликтующие события на стороне сервера в вашем API. Если конфликт обнаружен, верните статус ошибки в ответе и обработайте его на клиенте.

Также можно перезагрузить данные на стороне клиента, если проверка не удалась.

Чтобы обработать неудачу проверки, используйте события DataProcessor [onValidationError] и [onAfterUpdate] и для повторной загрузки данных применяйте методы Scheduler [clearAll] и [load]:

a. [onValidationError](https://docs.dhtmlx.com/api__dataprocessor_onvalidationerror_event.html)

возникает после срабатывания ошибки валидации, перед отправкой данных

~~~js
dp.attachEvent("onValidationError", function(id, details){
   //перезагрузить актуальные данные с сервера
   scheduler.clearAll();
   scheduler.load("/data");
});
~~~

Параметры:

- id - (string) идентификатор элемента, для которого возникает ошибка
- details - (object) детали ошибки

b. [onAfterUpdate](https://docs.dhtmlx.com/api__dataprocessor_onafterupdate_event.html)

срабатывает после получения и обработки ответа со стороны сервера

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

- id - (string) идентификатор обновлённого элемента
- action - (string) статус ответа (тип операции), смотрите детали ниже
- tid - (string) новый идентификатор (применимо только к операциям вставки)
- response - (mixed) xml-узел/json-объект, содержит распарсированный xml/json-ответ

Возможные статусы ответа следующие:

- updated;
- inserted;
- deleted;
- invalid;
- error.