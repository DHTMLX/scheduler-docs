---
title: "Скрытие единиц времени на оси X в представлении"
sidebar_label: "Скрытие единиц времени на оси X в представлении"
---

# Скрытие единиц времени на оси X в представлении

Библиотека позволяет скрывать ненужные единицы времени на горизонтальной шкале представления. Эта функция может быть полезна, например, чтобы отображать только рабочие дни, скрывая выходные.

## Техника

Чтобы скрыть единицу времени на шкале представления (например, час в представлении Timeline или день в представлении Week), вы можете использовать метод **ignore_(viewName)**. 
Этот метод представляет собой функцию, которая получает дату единицы времени в качестве параметра. Если функция возвращает *true* для определённой единицы, она будет скрыта.

Например, чтобы скрыть выходные в представлении Month, метод будет выглядеть следующим образом:

~~~js
// 0 соответствует воскресенью, 6 — субботе
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // скрывает субботы и воскресенья
        return true;
};
~~~

![hiding_time_units](/img/hiding_time_units.png)


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## Отображение маркера на месте скрытых единиц шкалы

Чтобы обозначить места, где единицы шкалы были скрыты, вы можете использовать метод [addMarkedTimespan](api/method/addmarkedtimespan.md). Например, в представлении Timeline видимыми остаются только часы с 10:00 до 18:00, остальные скрыты. 
Для выделения скрытых часов используется маркер с длительностью 40 минут: по 20 минут с каждой стороны граничных ячеек.

~~~html
.yellow_section {
    background-color: #ffa749;
    opacity: 0.25;
}
~~~

~~~js
scheduler.addMarkedTimespan({
    days: "fullweek",
    zones:[9.5*60, 20.5*60],
    invert_zones:true,
    css: "yellow_section"
});
~~~


![highlighting_hidden_hours](/img/highlighting_hidden_hours.png)


[Displaying a marker at the place of hidden scale units](https://docs.dhtmlx.com/scheduler/samples/11_scales/07_timeline_hours_marker.html)
