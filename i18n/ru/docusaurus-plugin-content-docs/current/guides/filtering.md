---
title: "Фильтрация событий"
sidebar_label: "Фильтрация событий"
---

# Фильтрация событий

Для любого указанного представления вы можете задать функцию фильтрации, которая будет определять, какие события должны отображаться в Scheduler и каких — нет.

~~~js
scheduler.filter_week = (id, event) => {
    if (event.name === 'New event') {
        return false; // событие будет отфильтровано (не отображено)
    }

    return true; // событие будет отображено
};
~~~

Here, `"week"` is the name of a view in `scheduler.filter_week`.

Метод `filter_(viewName)` принимает 2 параметра:

- `id` - идентификатор события
- `event` - объект события

Помните, что вы можете задать разные функции фильтрации для разных представлений:

~~~js
scheduler.filter_day = scheduler.filter_week = (id, event) => {
    // some code
};
...
scheduler.filter_timeline = (id, event) => {
    // some other code
};
~~~

### Связанные примеры
- [Фильтрация событий](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)