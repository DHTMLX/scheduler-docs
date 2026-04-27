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

When scheduler is initialized using this config, any HTML placed in the scheduler container prior to initialization will be removed and a generated markup will be put instead.

The value of this config can either be a plain array of elements, or a nested structure which describes a complex layout.

Note, that the height of the header/navigation bar is still controlled by the [scheduler.xy.nav_height](api/other/xy.md#illustration-images) option.


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


The supported values are:

 - **\{rows: Array, css:string\}** - a container for a multi-row header
 - **\{cols: Array, css:string\}** - a single row of a multi-row header
 - **"prev","next","today"** - date navigation buttons
 - **"date"** - the date label
 - **"day", "week", "month", etc.** - view tabs
 - **"spacer"** - a transparent element which takes the whole free space, can be used to push another element to the right side of the header
 - **\{html: string, click: function, css: string\}** - an object for injecting custom buttons or icons into the header
 - **"minicalendar"** - a [Mini Calendar](guides/minicalendar.md) toggle.

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

#### Mini Calendar settings:

The "minicalendar" value will display a minicalendar button with the following click handler:

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

If you want to call [renderCalendar](api/method/rendercalendar.md) with different parameters, you need to provide your own onclick handler for the minicalendar button:

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
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md)
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
