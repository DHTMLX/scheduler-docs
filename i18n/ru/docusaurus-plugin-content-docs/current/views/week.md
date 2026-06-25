---
title: "Week View"
sidebar_label: "Week View"
---

# Week View

Вид "Неделя" отображает одну или несколько недель одновременно.

![week_view](/img/week_view.png)


## Инициализация

Вид "Неделя" включён в [базовую разметку планировщика](guides/scheduler-markup.md) по умолчанию. Поэтому нет необходимости добавлять дополнительный код для включения этого вида в планировщик.

~~~js
// стандартная инициализация. Вид "Неделя" добавляется автоматически
scheduler.init('scheduler_here', new Date(2027,0,10), "week");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Удаление вкладки вида "Неделя"

Если вы хотите убрать вкладку вида "Неделя" из планировщика, просто удалите соответствующий div из [разметки планировщика](guides/scheduler-markup.md):

~~~js
// удалите этот div, чтобы убрать вкладку "Неделя"
<div class="dhx_cal_tab" name="week_tab"></div>
~~~


## Скрытие дней на оси X

Чтобы исключить определённые дни из шкалы, например, оставить только рабочие дни и пропустить выходные, используйте метод **ignore_week()**. 


Этот метод представляет собой функцию, которая получает дату и должна возвращать *true* для дней, которые вы хотите скрыть.

~~~js
// 0 — воскресенье, 6 — суббота
scheduler.ignore_week = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // скрывает субботы и воскресенья
        return true;
};
~~~


[Hiding days in the scale of Week view](https://docs.dhtmlx.com/scheduler/samples/11_scales/02_week_ignore.html)


## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны недельного вида](views/week-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
