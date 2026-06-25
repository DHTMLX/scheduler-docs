---
title: "Коробка настраиваемого события"
sidebar_label: "Коробка настраиваемого события"
---

# Коробка настраиваемого события

dhtmlxScheduler предоставляет возможность определить пользовательский внешний вид для событий.

:::note
Подходит только для [Вид дня](views/day.md), [Вид недели](views/week.md) и [Вид единиц](views/units.md)
:::

## Методика

Настройка отображения событий достигается с помощью метода [renderEvent](api/method/renderevent.md):

~~~js
scheduler.renderEvent = function(container, ev) {
    // ваш код настройки
}
~~~

- **_container_** - контейнер события
- **_ev_** - объект события

[Коробка настраиваемого события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

## Важные советы

- Возвращение _true_ применяет пользовательскую логику, возвращение _false_ применяет логику по умолчанию.
- Некоторые CSS-классы имеют особое назначение (они должны идти первыми в className элемента):
  - **_dhx_event_move_** - элемент с этим стилем можно перетаскивать (обычно это заголовок события). 
  - **_dhx_event_resize_** - перетаскивание элемента с этим стилем изменит продолжительность события.

~~~js
const html = "<div class='dhx_event_move my_event_move' "
~~~

## Пример

Ниже приведён пример некоторого пользовательского внешнего вида:

![custom_event_box](/img/custom_event_box.png)

[Задание пользовательского внешнего вида коробки события](Specifying a custom look for the event's box)
~~~js
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width; // напр., "105px"

    // секция перемещения
    let html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // контейнер для контента события
    html+= "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    // здесь два варианта: показать только начальную дату для коротких событий или начальную+конечную для длинных
    if ((ev.end_date - ev.start_date)/60000>40){//если событие длится более 40 минут
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // отображение текста события
    html += "<span>" + scheduler.templates.event_text(ev.start_date,ev.end_date,ev)+
    "</span>" + "</div>";

    // секция изменения размера
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; //требуется, true - чтобы отобразить пользовательскую форму, false - стандартную форму
};
~~~

и следующий связанный CSS:

~~~html
<style type="text/css" >
    /* фоновый цвет для всего контейнера и его границы*/
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

    /* стили для содержания события */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* информация о дате события */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* секция изменения размера события */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* секция перемещения события */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

Можно также использовать CSS-переменные вместо фиксированных значений цветов, как показано ниже:

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

[Коробка настраиваемого события](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)