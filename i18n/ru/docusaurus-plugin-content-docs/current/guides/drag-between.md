--- 
title: "Перетаскивание между расписаниями"
sidebar_label: "Перетаскивание между расписаниями"
---

# Перетаскивание между расписаниями

:::info
Эта функциональность доступна только для лицензий Commercial (с 6 октября 2021 года), Enterprise и Ultimate.
:::

Если на странице отображаются [несколько расписаний](guides/multiple-per-page.md), можно включить операции перетаскивания между ними, чтобы пользователи могли перетаскивать события из одного расписания в другое и обратно.

Чтобы включить поддержку перетаскивания между расписаниями, достаточно на странице подключить расширение "**drag_between**":

[Enabling drag-and-drop support for several schedulers](Enabling drag-and-drop support for several schedulers)
~~~html
<script src="codebase/dhtmlxscheduler.js"></script>
<link rel="stylesheet" href="codebase/dhtmlxscheduler.css" type="text/css">

<script>
scheduler.plugins({
    drag_between: true
});

scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
</script>
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).

### Запрет перетаскивания событий к/из одного из расписаний
Чтобы запретить перетаскивание событий из расписания, установите свойство [drag_out](api/config/drag_out.md) в *false*:

~~~js
scheduler.config.drag_out = false;//restrict dragging events from this scheduler /*!*/
scheduler.init('scheduler_here',new Date(2027, 5,30),"week");
scheduler.load("./data/units.xml");

scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

Чтобы запретить перетаскивание событий в расписание, установите свойство [drag_in](api/config/drag_in.md) в *false*:

~~~js
scheduler.init('scheduler_here',new Date(2027, 5, 30),"week");
scheduler.load("./data/units.xml");


scheduler2.config.drag_in = false;//restrict dragging events to this scheduler /*!*/
scheduler2 = Scheduler.getSchedulerInstance();
scheduler2.init('scheduler_here_2',new Date(2027, 5, 30),"week");
~~~

Sample **"samples/20_multiple/06_drag_between_layout.html"** provided in the [Scheduler PRO package](https://dhtmlx.com/docs/products/dhtmlxScheduler/).

### Перетаскивание событий
- [onBeforeEventDragOut] -  срабатывает до того, как перетащённое событие будет перемещено из расписания
- [onEventDragOut] - срабатывает, когда перетащённое событие  перемещается из расписания
- [onBeforeEventDragIn] - срабатывает до того, как перетащённое событие будет перемещено над расписанием
- [onEventDragIn] - срабатывает, когда перетащённое событие  перемещается над расписанием
- [onEventDropOut] - срабатывает, когда перетащённое событие  сбрасывается за пределы области расписания