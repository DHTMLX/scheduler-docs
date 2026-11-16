---
sidebar_label: header
title: "header config"
description: "provides a layout-like configuration for the scheduler header (navigation panel)"
---

# header

### Description

@short: Provides a layout-like configuration for the scheduler header (navigation panel)

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

When Scheduler is initialized using this config, any HTML placed in the scheduler container prior to initialization will be removed and generated markup will be put instead.

The value of this config can either be a plain array of elements, or a nested structure which describes a complex layout.

`scheduler.xy.nav_height = 0` hides the navigation bar. Other positive values do not set its height. With Toolbar, set a positive `header.height` or `--dhx-scheduler-toolbar-height` to set the bar height.


~~~js
scheduler.config.header = {
    height: 80,
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


The supported legacy values are:

- `{ rows: Array, align?: "left" | "right" }` and `{ cols: Array, align?: "left" | "right" }` - nested layout containers; every item run becomes one Toolbar group
- `"prev"`, `"next"`, and `"today"` - date navigation buttons
- `"date"` - the current date label
- `"day"`, `"week"`, `"month"`, or any registered view name - a view tab
- `"spacer"` - a flexible empty item that pushes following items to the right
- `"minicalendar"`, `"button"`, or `{ view: "..." }` - the corresponding legacy header item
- `{ html, click, css, width, height }`, or another object without `id`, `view`, `rows`, or `cols` - a legacy custom button. `html` supplies its content and `click` runs with `this` set to the item node.

## Toolbar item forms

The following forms are available only when `toolbar: true` is enabled:

- `"views"` - a view selector. It is segmented by default; use `{ id: "views", comp: "menu" }` for a menu, or provide `options` to select and order its views.
- `"add_event"` - the New Event action.
- `"toggle_sidebar"` - toggles the Sidebar plug-in when it is enabled.
- `"|"` - a visual separator.
- `{ id, comp, label, ... }` - a UI-kit item. An `id` matching a built-in customizes that built-in; every other ID creates a custom item.
- `{ id, comp: "container" }` - an empty host. Populate it in `onToolbarItemRender`.

`comp` can be `button`, `toggle`, `menu`, `combo`, `segmented`, `text`,
`stepper`, `datepicker`, `separator`, `spacer`, or `container`. Custom items
may use `label`, `icon`, `tooltip`, `css`, `width`, `height`, `align`,
`disabled`, `hidden`, `value`, `placeholder`, `options`, `items`, and `config`.
`options` configures `combo` and `segmented`; `items` configures `menu`; and
`config` supplies component-specific settings such as `min`, `max`, `step`, or
`format`.

Do not combine `id` with legacy `view`, `html`, or `click`: it remains a legacy
item and Scheduler logs a warning. Use `onToolbarItemClick` and
`onToolbarItemChange` for custom Toolbar-item actions.

### Toolbar configuration examples

Enable the plug-in before initialization in each example:

~~~js
scheduler.plugins({ toolbar: true, minical: true });
~~~

**1. Standard navigation with a segmented view selector**

~~~js
scheduler.config.header = [
    "add_event", "spacer", "prev", "date", "next", "today",
    { id: "views", comp: "segmented", options: ["day", "week", "month"] }
];
~~~

**2. Custom UI-kit controls and a separator**

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

**3. A two-row layout with legacy items and application-owned content**

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

#### Mini Calendar settings:

The `minicalendar` value will display a minicalendar button with the following click handler:

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

If you want to call [`renderCalendar()`](api/method/rendercalendar.md) with different parameters, you need to provide your own `onclick` handler for the minicalendar button:

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
