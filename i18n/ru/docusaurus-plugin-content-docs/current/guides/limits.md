---
title: "Блокировка и выделение дат"
sidebar_label: "Блокировка и выделение дат"
---

# Блокировка и выделение дат

В данной библиотеке доступно расширение **Limit**, которое позволяет блокировать и выделять определённые даты или диапазоны дат.

Чтобы начать использовать этот плагин, просто активируйте его на вашей странице.

:::note
Обратите внимание, если вы используете [Вид 'Timeline'](views/timeline.md), расширение 'limit' должно быть подключено раньше, чем 'timeline':
:::

~~~js
scheduler.plugins({
    limit: true, /*!*/
    timeline: true
});
~~~

## Параметры конфигурации {#configurationoptions}

Ниже представлены параметры конфигурации, доступные для этого расширения:


- [display_marked_timespans](api/config/display_marked_timespans.md) - управляет отображением выделенных (заблокированных) промежутков времени в Gantt
- [check_limits](api/config/check_limits.md) - включает или отключает проверку ограничений
- [mark_now](api/config/mark_now.md) - включает или отключает маркер текущего времени
- [now_date](api/config/now_date.md) - задаёт дату, используемую опцией [mark_now](api/config/mark_now.md)
- [limit_end](api/config/limit_end.md) - определяет конечную границу допустимого диапазона дат
- [limit_start](api/config/limit_start.md) - определяет начальную границу допустимого диапазона дат
- [limit_view](api/config/limit_view.md) - ограничивает просмотр событий


[Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)


## Связанные события {#relatedevents}

Если пользователь попытается создать или изменить событие на недопустимую дату, будет вызвано событие [onLimitViolation](api/event/onlimitviolation.md).

## Как заблокировать определённые даты? {#howtoblockcertaindates}

Существует несколько способов задать ограничения в Gantt:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - выделяет даты и может блокировать их с помощью пользовательских стилей
- [markTimespan](api/method/marktimespan.md) - выделяет или блокирует даты с использованием стандартных или пользовательских стилей; выделение удаляется после любого внутреннего обновления, удобно для подсветки


[Blocking dates](https://docs.dhtmlx.com/scheduler/samples/03_extensions/25_advanced_limitation.html)


## Как выделить определённые даты? {#howtomarkcertaindates}

Вы можете использовать эти два метода для подсветки определённых дат:


- [addMarkedTimespan](api/method/addmarkedtimespan.md) - выделяет даты и может блокировать их с помощью пользовательских стилей
- [markTimespan](api/method/marktimespan.md) - выделяет или блокирует даты с использованием стандартных или пользовательских стилей; выделение удаляется после любого внутреннего обновления, удобно для подсветки


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Удаление выделения/блокировки {#removingmarkingblocking}

Чтобы снять текущее выделение или блокировку промежутков времени, используйте следующие методы:


- [deleteMarkedTimespan](api/method/deletemarkedtimespan.md) - удаляет выделения или блокировки, созданные с помощью [addMarkedTimespan](api/method/addmarkedtimespan.md)
- [unmarkTimespan](api/method/unmarktimespan.md) - удаляет выделения или блокировки, созданные с помощью [markTimespan](api/method/marktimespan.md)


[Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)


## Приоритет блокировки {#blockingpriority}

Если используются несколько методов блокировки для разных диапазонов, приоритет блокировки работает следующим образом (от наивысшего к низшему):


1. Даты, указанные с помощью объектов Date() для конкретных элементов;
2. Даты для конкретных элементов (когда установлен параметр **sections**);
3. Даты, указанные с помощью объектов Date();
4. Прочие даты.

- Блокировка или выделение с более высоким приоритетом перекроет те, что с более низким приоритетом, если у них одинаковый **type**.
- Методы блокировки или выделения с одинаковым приоритетом (перекрывающиеся по времени) будут применяться одновременно.

Например:

~~~js
scheduler.addMarkedTimespan({ // блокирует 4 июля 2012 года (среда).
    days:  new Date(2019, 7, 4),
    zones: "fullday", 
    type:  "dhx_time_block",
    css:   "red_section" // применён CSS-класс
});
scheduler.addMarkedTimespan({ // блокирует каждое воскресенье, понедельник, среду
    days:  [0, 1, 3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "blue_section" // применён CSS-класс
});
// блокирует только воскресенье и среду для элемента с id="2" 
scheduler.addMarkedTimespan({  
    days:  [0,3], 
    zones: "fullday",
    type:  "dhx_time_block", 
    css:   "gray_section",  // применён CSS-класс
    sections: { timeline: 2} 
});

~~~

После этих вызовов Gantt будет работать следующим образом:


1. Сначала будут заблокированы **все воскресенья и среды для элемента с id="2" в Timeline**, они будут выделены серым цветом.
2. Затем будет заблокировано **4 июля 2012 года**, выделено красным.
3. В завершение будут заблокированы **все воскресенья, понедельники и среды**, выделены синим.

![limits_priority.png](/img/limits_priority.png)

Если вы хотите отображать все маркеры вне зависимости от их приоритета, установите параметр [overwrite_marked_timespans](api/config/overwrite_marked_timespans.md) следующим образом:

~~~js
scheduler.config.overwrite_marked_timespans_config = false;
~~~
