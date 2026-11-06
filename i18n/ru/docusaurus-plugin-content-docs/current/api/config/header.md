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

`scheduler.xy.nav_height = 0` скрывает панель навигации. Другие положительные значения не задают ее высоту. В режиме Toolbar используйте положительное `header.height` или `--dhx-scheduler-toolbar-height`.

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


Поддерживаемые устаревшие значения:

- `{ rows: Array, align?: "left" | "right" }` и `{ cols: Array, align?: "left" | "right" }` - вложенные контейнеры; каждый ряд элементов становится группой Toolbar
- `"prev"`, `"next"`, `"today"` - кнопки навигации по дате
- `"date"` - метка текущей даты
- `"day"`, `"week"`, `"month"` или имя зарегистрированного представления - вкладка представления
- `"spacer"` - гибкий пустой элемент, сдвигающий следующие элементы вправо
- `"minicalendar"`, `"button"` или `{ view: "..." }` - соответствующий устаревший элемент
- `{ html, click, css, width, height }` или объект без `id`, `view`, `rows`, `cols` - пользовательская устаревшая кнопка. `html` задает содержимое, `click` выполняется с узлом в `this`.

## Формы элементов Toolbar

Следующие формы доступны только при включенном `toolbar: true`:

- `"views"` - выбор представления, по умолчанию сегментированный. Для меню используйте `{ id: "views", comp: "menu" }`, для выбора и порядка — `options`.
- `"add_event"` - действие нового события.
- `"toggle_sidebar"` - переключает Sidebar.
- `"|"` - визуальный разделитель.
- `{ id, comp, label, ... }` - элемент UI kit. Встроенный `id` настраивает соответствующий элемент, остальные создают пользовательские.
- `{ id, comp: "container" }` - пустой хост, заполняемый в `onToolbarItemRender`.

`comp` может быть `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer`, `container`. Пользовательские элементы могут использовать `label`, `icon`, `tooltip`, `css`, `width`, `height`, `align`, `disabled`, `hidden`, `value`, `placeholder`, `options`, `items`, `config`. `options` настраивает `combo` и `segmented`, `items` — `menu`, `config` — параметры компонента.

Не объединяйте `id` с устаревшими `view`, `html`, `click`: элемент остается устаревшим, и Scheduler выводит предупреждение. Для действий используйте `onToolbarItemClick` и `onToolbarItemChange`.

### Примеры настройки Toolbar

Включите плагин перед инициализацией:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
~~~

**1. Стандартная навигация с сегментированным выбором представления**

~~~js
scheduler.config.header = [
    "add_event", "spacer", "prev", "date", "next", "today",
    { id: "views", comp: "segmented", options: ["day", "week", "month"] }
];
~~~

**2. Пользовательские элементы UI kit и разделитель**

~~~js
scheduler.config.header = [
    "prev", "next", "|",
    { id: "range", comp: "combo", label: "Range", options: ["week", "month"] },
    { id: "search", comp: "text", placeholder: "Search events", width: 220 },
    "spacer",
    { id: "create", comp: "button", label: "Create", css: "my-create-button" }
];

scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "range") scheduler.setCurrentView(null, value);
    return true;
});
~~~

**3. Двухстрочный макет с устаревшими элементами и содержимым приложения**

~~~js
scheduler.config.header = {
    rows: [
        { cols: ["prev", "date", "next", { view: "minicalendar" }] },
        { cols: ["today", { id: "views", comp: "menu" }, "spacer", { id: "filters", comp: "container" }], align: "right" }
    ]
};

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "filters" || node.firstChild) return;
    const input = document.createElement("input");
    input.placeholder = "Filter";
    node.appendChild(input);
});
~~~
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