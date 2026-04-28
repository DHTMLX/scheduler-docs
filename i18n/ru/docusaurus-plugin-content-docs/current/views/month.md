---
title: "Месячный вид"
sidebar_label: "Месячный вид"
---

# Месячный вид

Месячный вид отображает один календарный месяц.

![month_view](/img/month_view.png)

## Инициализация {#initialization}

Месячный вид включён по умолчанию в [разметку базового планировщика](guides/scheduler-markup.md), поэтому не требуется никаких дополнительных действий для его добавления.

~~~js
// стандартная инициализация; месячный вид добавляется автоматически
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
...
scheduler.load("/data/events");
~~~


[Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)


## Удаление вкладки месячного вида {#removingthemonthviewtab}

Если вы хотите удалить вкладку месячного вида, просто удалите соответствующий div из [разметки планировщика](guides/scheduler-markup.md):

~~~js
// удалите этот div, чтобы убрать вкладку Month
<div class="dhx_cal_tab" name="month_tab"></div>
~~~

## Ограничение количества событий в ячейке {#limitingthenumberofeventsinacell}

По умолчанию планировщик подстраивает высоту ячейки так, чтобы вместить все события.

Начиная с версии 4.0, вы можете контролировать, сколько событий отображается в каждой ячейке, что также ограничивает высоту ячейки.

Чтобы задать максимальное количество событий в ячейке, используйте опцию [max_month_events](api/config/max_month_events.md):

~~~
scheduler.config.max_month_events = 3;
..
scheduler.init('scheduler_here', new Date(2019,5,30), "month");
~~~

Если событий больше, чем указанный лимит, появляется ссылка 'View more'. При нажатии на неё пользователь перейдёт в дневной вид, где все события будут показаны полностью.


['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)


## Скрытие дней на оси X в месячном виде {#hidingdaysinthexaxisoftheview}

Чтобы исключить определённые дни из шкалы - например, отображать только рабочие дни и скрывать выходные - используйте метод **ignore_month()**. 


Эта функция получает в качестве параметра дату ячейки. Верните *true* для любого дня, который нужно скрыть.

~~~js
// 0 — воскресенье, 6 — суббота
scheduler.ignore_month = function(date){
    if (date.getDay() == 6 || date.getDay() == 0) // скрывает субботу и воскресенье
        return true;
};
~~~


[Hiding week days in the scale of Month view](https://docs.dhtmlx.com/scheduler/samples/11_scales/01_month_ignore.html)


## Отображение номеров дней как кликабельных ссылок {#presentingdaysnumbersasclickablelinks}

Номера дней в месячном виде могут быть кликабельными и открывать соответствующий день в выбранном виде.

Чтобы сделать номера дней кликабельными:

1. Активируйте расширение active_links на странице:
~~~js
scheduler.plugins({
    active_links: true
});
~~~
2. (Необязательно) Задайте опцию [active_link_view](api/config/active_link_view.md), чтобы указать, какой вид будет открываться при клике по дню. По умолчанию открывается [Дневной вид](views/day.md):
~~~js
// при клике по дню открывается недельный вид
scheduler.config.active_link_view = "week";
...
scheduler.init('scheduler_here', new Date(2027,7,6), "month");
~~~


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Изменение размера событий с помощью drag-n-drop (версия 4.1+) {#resizingeventsbydragndropver41}

По умолчанию изменение размера событий в месячном виде с помощью drag-n-drop не разрешено (только через форму редактирования).

Чтобы разрешить изменение размера многодневных событий с помощью drag-n-drop, включите опцию [resize_month_events](api/config/resize_month_events.md):

~~~js
// разрешить изменение размера многодневных событий с помощью drag-n-drop
scheduler.config.resize_month_events = true; /*!*/

scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

[Resizable events in Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/32_resizable_month_events.html)


Чтобы разрешить изменение размера как однодневных, так и многодневных событий с помощью drag-n-drop, также установите опцию [resize_month_timed](api/config/resize_month_timed.md) в *true*:

~~~js
// разрешить изменение размера однодневных и многодневных событий с помощью drag-n-drop
scheduler.config.resize_month_events = true;/*!*/
scheduler.config.resize_month_timed = true;  /*!*/
scheduler.init('scheduler_here', new Date(2027,0,10), "month");
~~~

**Обратите внимание:**

- Опция [resize_month_timed](api/config/resize_month_timed.md) работает только если включена [resize_month_events](api/config/resize_month_events.md).
- При включённой [resize_month_timed](api/config/resize_month_timed.md) однодневные события получают другой внешний вид:

![resizemonthtimed_config](/img/resizemonthtimed_config.png)
  

## Связанные руководства

- [Общие инструкции по настройке](guides/configuration.md)
- [Шаблоны для Месячного Вида](views/month-view-templates.md)
- [Загрузка данных](guides/loading-data.md)
- [Операции с объектом события](guides/event-object-operations.md)
- [Блокировка и выделение дат](guides/limits.md)
- [Скины](guides/skins.md)
