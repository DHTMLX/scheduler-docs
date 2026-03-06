---
title: "Фильтрация событий"
sidebar_label: "Фильтрация событий"
---

# Фильтрация событий

Для каждой вьюхи можно определить функцию фильтрации, которая определяет, какие события будут отображаться в планировщике, а какие будут скрыты.

~~~js
scheduler.filter_week = function(id, event){
    if(event.name == 'New event')
        return false; // событие будет отфильтровано (не отображено)
        //или
        return true; // событие будет отображено
}
~~~

Здесь 'week' относится к имени вьюхи (используется в *'scheduler.filter_week'*).

Функция **filter_(viewName)** принимает два аргумента:

- **id** - идентификатор события
- **event** - сам объект события

Также возможно назначить разные функции фильтрации для различных вьюх:

~~~js
scheduler.filter_day = scheduler.filter_week = function(id, event){
    //some_code
}
...
scheduler.filter_timeline = function(id, event){
    //some_other code
}

~~~


[Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)
