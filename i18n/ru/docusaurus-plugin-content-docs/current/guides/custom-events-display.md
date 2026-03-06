---
title: "Пользовательское Окно События"
sidebar_label: "Пользовательское Окно События"
---

# Пользовательское Окно События

dhtmlxScheduler позволяет настраивать отображение событий.

:::note
Эта функция работает только с [Дневной вид](views/day.md), [Week View](views/week.md) и [Units View](views/units.md).
:::

## Техника

Вы можете настраивать события с помощью метода [renderEvent](api/method/renderevent.md):

~~~js
scheduler.renderEvent = function(container, ev) {
    // ваш код кастомизации
}
~~~

- **_container_** - элемент-контейнер для события
- **_ev_** - сам объект события


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## Важные советы

- Возврат _true_ применяет вашу пользовательскую отрисовку, возврат _false_ возвращает стандартную отрисовку.
- Некоторые CSS-классы имеют особое назначение и должны быть первыми в className элемента:
  - **_dhx_event_move_** - делает элемент перетаскиваемым (обычно заголовок события).
  - **_dhx_event_resize_** - позволяет изменять длительность события перетаскиванием элемента.

~~~js
var html = "<div class='dhx_event_move my_event_move' "
~~~

## Пример

Вот пример пользовательского отображения события:

![custom_event_box](/img/custom_event_box.png)

~~~js title="Определение пользовательского вида окна события"
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width; // например, "105px"

    // секция перемещения
    var html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // контейнер для содержимого события
    html += "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    // два варианта: показывать только дату начала для коротких событий или начало+конец для длинных
    if ((ev.end_date - ev.start_date)/60000 > 40) { // если событие длится больше 40 минут
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // отображение текста события
    html += "<span>" + scheduler.templates.event_text(ev.start_date, ev.end_date, ev) +
    "</span></div>";

    // секция изменения размера
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; // обязательно: true – использовать кастомную отрисовку, false – стандартную
};
~~~

Связанный CSS выглядит так:

~~~html
<style type="text/css" >
    /* фон и граница для всего контейнера */
    .my_event {
        background: #add8e6;
        color: black;
        border: 1px solid #778899;
        overflow: hidden;
        display: block;
    }

    .dhx_cal_event_clear.my_event {
        height: 22px;
    }

    /* стили для содержимого события */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* оформление даты события */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* ползунок изменения размера */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* ползунок перемещения */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

В качестве альтернативы можно использовать CSS-переменные вместо фиксированных цветов, например:

~~~html
<style>
.my_event {
    --dhx-scheduler-event-background: #add8e6;
    --dhx-scheduler-event-color: black;
    --dhx-scheduler-event-border: 1px solid #778899;

    overflow: hidden;
    display: block;
}
</style>
~~~


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)
