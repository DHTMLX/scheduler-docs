---
sidebar_label: "header"
title: "header config"
description: "设置调度器 header（导航面板）的布局"
---

# header

### Description

@short: 设置调度器 header（导航面板）的布局

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

当调度器使用此配置初始化时，调度器容器内的任何现有 HTML 都将被生成的标记替换。

此配置可以是一个简单的元素数组，也可以是嵌套结构以定义更复杂的布局。

请注意，header/导航栏的高度仍由 [scheduler.xy.nav_height](api/other/xy.md#day) 选项控制。


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


支持的值包括:

 - **\{rows: Array, css:string\}** - 多行 header 的容器
 - **\{cols: Array, css:string\}** - 多行 header 中的单行
 - **"prev","next","today"** - 日期导航按钮
 - **"date"** - 显示当前日期的标签
 - **"day", "week", "month" 等** - 用于切换视图的标签页
 - **"spacer"** - 透明元素，占据剩余空间，常用于将元素推到右侧
 - **\{html: string, click: function, css: string\}** - 用于在 header 中添加自定义按钮或图标的对象
 - **"minicalendar"** - 切换 [Mini Calendar](guides/minicalendar.md) 的开关按钮。

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

#### Mini Calendar 设置:

"minicalendar" 选项添加了一个按钮，用于切换迷你日历，其点击处理函数如下:

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

若要使用不同参数自定义迷你日历行为，可以为 minicalendar 按钮提供自定义的点击处理函数，如下所示:

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
     
}},
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [Mobile Responsive Scheduler](guides/touch-support.md)
- [dhtmlxScheduler를 순수 JS/HTML에서 사용하기](guides/initialization.md#initializing-scheduler-via-header-config)
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
