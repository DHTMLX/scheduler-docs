---
sidebar_label: header
title: "header config"
description: "настраивает layout для header планировщика (панели навигации)"
---

# header

### Description

@short: Предоставляет конфигурацию в стиле макета для заголовка планировщика (панель навигации)

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

При инициализации Scheduler с использованием этой конфигурации любой HTML, размещённый в контейнере планировщика до инициализации, будет удалён, а вместо него будет вставлена сгенерированная разметка.

Значение этой конфигурации может быть либо простым массивом элементов, либо вложенной структурой, которая описывает сложный макет.

Обратите внимание, что высота заголовка/панели навигации по-прежнему контролируется параметром [`scheduler.xy.nav_height`](api/other/xy.md#illustration-images) опции.

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


Поддерживаемые значения:

- `{rows: Array, css: string}` - контейнер для многострочного заголовка
- `{cols: Array, css: string}` - одна строка в многострочном заголовке
- `"prev"`, `"next"`, `"today"` - кнопки навигации по дате
- `"date"` - метка даты
- `"day"`, `"week"`, `"month"`, и т. д. - вкладки видов
- `"spacer"` - прозрачный элемент, занимающий всё свободное пространство и может использоваться для выравнивания элементов по правой стороне заголовка
- `{html: string, click: function, css: string}` - объект для внедрения пользовательских кнопок или значков в заголовок
- `"minicalendar"` - переключатель [Mini Calendar](guides/minicalendar.md)

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { html: "click me!", click: () => { alert("done!"); } },
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Настройки Mini Calendar:

Опция "minicalendar" добавляет кнопку, которая переключает мини-календарь с таким click handler:

~~~js
function showCalendar() {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: (date, calendar) => {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

Если вы хотите вызвать [`renderCalendar()`](api/method/rendercalendar.md) с другими параметрами, вам нужно предоставить свой обработчик `onclick` для кнопки мини-календаря:

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { view: "minicalendar", click: function() {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: (date, calendar) => {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }

    } },
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md)
- [Mini Calendar (Date Picker)](guides/minicalendar.md)