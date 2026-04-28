--- 
sidebar_label: header
title: "header 配置"
description: "为调度器头部（导航面板）提供布局式配置"
---

# header

### Description

@short: 提供调度器头部（导航面板）的布局式配置

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

当 Scheduler 使用此配置进行初始化时，初始化前放置在调度器容器中的任何 HTML 都会被移除，并将生成的标记替换它们。

该配置的值可以是一个简单的元素数组，亦可是描述复杂布局的嵌套结构。

请注意，头部/导航栏的高度仍然由 [`scheduler.xy.nav_height`](api/other/xy.md#illustration-images) 选项控制。

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


支持的值包括:

- `{rows: Array, css: string}` - 一个多行表头的容器
- `{cols: Array, css: string}` - 一个多行表头中的单行
- `"prev"`, `"next"`, `"today"` - 日期导航按钮
- `"date"` - 日期标签
- `"day"`, `"week"`, `"month"`, 等 - 视图选项卡
- `"spacer"` - 一个透明元素，占用整块自由空间，可用于将另一个元素推到头部的右侧
- `{html: string, click: function, css: string}` - 用于在头部注入自定义按钮或图标的对象
- `"minicalendar"` - 一个 [Mini Calendar](guides/minicalendar.md) 的切换

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

#### Mini Calendar 设置：

minicalendar 值将显示一个 minicalendar 按钮，点击处理程序如下：

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

如果你想用不同的参数调用 [`renderCalendar()`](api/method/rendercalendar.md)，你需要为 minicalendar 按钮提供你自己的 `onclick` 处理程序：

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