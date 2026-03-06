---
title: "Интеграция с Backbone"
sidebar_label: "Интеграция с Backbone"
---

# Интеграция с Backbone

Начиная с версии 4.0, библиотека предоставляет специальное расширение [**mvc**](guides/extensions-list.md#mvc), которое обеспечивает плавную интеграцию планировщика с библиотекой Backbone.

Для приложений, построенных на Backbone и желающих использовать планировщик при сохранении управления данными через Backbone, можно использовать следующий подход:

1. Добавьте файлы dhtmlxScheduler в ваше приложение:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. Включите расширение mvc на странице:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. Настройте и инициализируйте планировщик как обычно:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here", new Date(2019,0,6), "month");
~~~
4. Далее создайте коллекцию данных Backbone и подключите к ней планировщик:
~~~js
//здесь можно использовать любую модель
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //связываем планировщик с коллекцией
~~~

После этого планировщик будет загружать данные из коллекции и поддерживать синхронизацию при любых изменениях. Аналогично, любые изменения, внесённые через интерфейс планировщика, вызовут соответствующие события в коллекции Backbone.

Этот процесс довольно прост. Ключевой момент - использовать метод [backbone](api/method/backbone.md) вместо стандартных методов [load](api/method/load.md) или [parse](api/method/parse.md).


Метод [backbone](api/method/backbone.md) гарантирует, что планировщик остаётся синхронизированным со всеми изменениями данных в модели Backbone и наоборот.
В качестве параметра он принимает коллекцию Backbone.


[Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)
