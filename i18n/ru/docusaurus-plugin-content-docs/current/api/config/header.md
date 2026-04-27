---
sidebar_label: header
title: "header config"
description: "обеспечивает конфигурацию, напоминающую макет, для header (панели навигации) планировщика"
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

**Значение по умолчанию:** null

### Details

Когда scheduler инициализируется с использованием этой конфигурации, любое HTML-размещение в контейнере scheduler до инициализации будет удалено, а вместо него будет вставлена сгенерированная разметка.

Значение этой конфигурации может быть либо простым массивом элементов, либо вложенной структурой, описывающей сложный макет.

Примечание: высота header/navigation bar по-прежнему управляется опцией [scheduler.xy.nav_height](api/other/xy.md#illustration-images).


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
<div id="scheduler_here" style="height:100vh;width:100vw"></div>
~~~


Поддерживаемые значения включают:

 - **\{rows: Array, css:string\}** - контейнер для многострочного заголовка
 - **\{cols: Array, css:string\}** - одна строка многострочного заголовка
 - **"prev","next","today"** - кнопки навигации по дате
 - **"date"** - метка даты
 - **"day", "week", "month", etc.** - вкладки отображения
 - **"spacer"** - прозрачный элемент, который занимает всё доступное пространство и может использоваться для подтягивания другого элемента к правой стороне заголовка
 - **\{html: string, click: function, css: string\}** - объект для вставки пользовательских кнопок или иконок в header
 - **"minicalendar"** - переключатель на мини-календарь [Mini Calendar](guides/minicalendar.md) toggle.

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    {html:"click me!", click:function(){alert("done!") }},
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Настройки Mini Calendar:

Значение "minicalendar" будет отображать кнопку мини-календаря со следующим обработчиком клика:

~~~js
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

Если вы хотите вызвать [renderCalendar](api/method/rendercalendar.md) с другими параметрами, вам нужно предоставить собственный обработчик onclick для кнопки minicalendar:

~~~js
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
     
}},
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Мобильный адаптивный Scheduler](guides/touch-support.md)
- [dhtmlxScheduler на Plain JS/HTML](guides/initialization.md)
- [Мини-календарь (Date Picker)](guides/minicalendar.md)