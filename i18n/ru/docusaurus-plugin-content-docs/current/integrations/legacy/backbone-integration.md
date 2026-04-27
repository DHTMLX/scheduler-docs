---
title: "Интеграция с Backbone (устаревшая)"
sidebar_label: "Интеграция с Backbone (устаревшая)"
---

## Интеграция с Backbone (устаревшая)

:::warning
Эта статья описывает устаревшую интеграцию. Если вы начинаете с нуля, смотрите решения по интеграции фреймворков или настройку на чистом JS.
:::

С версии 4.0 библиотека предоставляет специальное расширение [**mvc**](guides/extensions-list.md#legacy), которое позволяет интегрировать планировщик с библиотекой Backbone.

Если у вас есть приложение на основе Backbone и вы хотите добавить туда планировщик (при этом данные всё ещё управляются через Backbone), используйте следующую последовательность действий:

1. Добавьте файлы dhtmlxScheduler в приложение:
~~~js
<script src="../../codebase/dhtmlxscheduler.js" ></script>
<link rel="stylesheet" href="../../codebase/dhtmlxscheduler.css">
~~~
2. Активируйте расширение <b>mvc</b> на странице:
~~~js
scheduler.plugins({
    mvc: true
});
~~~
3. Инициализируйте и настройте планировщик обычным способом:
~~~js
scheduler.full_day = true;

scheduler.init("scheduler_here",new Date(2027,0,6),"month");
~~~
4. Теперь вы можете создать коллекцию данных в Backbone и привязать планировщик к ней:
~~~js
//you can use any model here
MyEvent   = Backbone.Model.extend({});
EventList = Backbone.Collection.extend({
    model:MyEvent,
    url:"./data/backbone.json"
});
events = new EventList();
            

scheduler.backbone(events); //link scheduler to collection
~~~

После этого планировщик будет загружать данные из коллекции и отражать любые обновления в ней. Также любые изменения через UI планировщика будут вызывать соответствующие события в коллекции Backbone.


Как видите, это довольно просто. Всё, что вам нужно, — использовать метод [backbone](api/method/backbone.md) вместо обычных [load](api/method/load.md) или [parse](api/method/parse.md).

Метод [backbone](api/method/backbone.md) заставляет планировщик отражать все изменения данных в модели Backbone и наоборот.
В качестве параметра метод принимает коллекцию Backbone.

[Интеграция с Backbone](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)