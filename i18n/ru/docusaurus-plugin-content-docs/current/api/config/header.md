---
sidebar_label: "header"
title: "header config"
description: "настраивает layout для header планировщика (панели навигации)"
---

# header

### Description

@short: Настраивает layout для header планировщика (панели навигации)

@signature: header: any

### Example

~~~jsx
scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

**Default value:** null

### Details

При инициализации планировщика с этой настройкой, любой существующий HTML внутри контейнера планировщика будет заменён сгенерированной разметкой.

Эта конфигурация может быть простым массивом элементов или вложенной структурой для определения более сложного layout.

Учтите, что высота header/панели навигации по-прежнему контролируется опцией [scheduler.xy.nav_height](api/other/xy.md#day).


~~~js
scheduler.xy.nav_height = 80;
scheduler.config.header = {
    rows: [
        {
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        {
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
scheduler.init("scheduler_here");
~~~


~~~html
<div id="scheduler_here"></div>
~~~


Поддерживаемые значения включают:

 - **\{rows: Array, css:string\}** - контейнер для header с несколькими строками
 - **\{cols: Array, css:string\}** - одна строка внутри многострочного header
 - **"prev","next","today"** - кнопки для навигации по дате
 - **"date"** - label, показывающий текущую дату
 - **"day", "week", "month" и т.д.** - вкладки для переключения видов
 - **"spacer"** - прозрачный элемент, заполняющий доступное пространство, полезен для смещения элементов вправо
 - **\{html: string, click: function, css: string\}** - объект для добавления кастомных кнопок или иконок в header
 - **"minicalendar"** - переключатель для [Mini Calendar](guides/minicalendar.md).

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    {html:"click me!", click:function(){alert("done!") 
:::,
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Настройки Mini Calendar:

Опция "minicalendar" добавляет кнопку, которая переключает мини-календарь с таким click handler:

~~~
function showCalendar () {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: function (date, calendar) {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

Чтобы настроить поведение мини-календаря с другими параметрами, предоставьте свой click handler для кнопки minicalendar следующим образом:

~~~
scheduler.config.header = [
    "day",
    "week",
    "month",
    {view: "minicalendar", click: function () {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: function (date, calendar) {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }
     
:::,
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Мобильная адаптивность Scheduler](guides/touch-support.md)
- [dhtmlxScheduler на чистом JS/HTML](guides/initialization.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
