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

`scheduler.xy.nav_height = 0` 会隐藏导航栏。其他正值不会设置其高度。在 Toolbar 模式下，请使用正数 `header.height` 或 `--dhx-scheduler-toolbar-height` 设置栏高。

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


支持的旧式值包括：

- `{ rows: Array, align?: "left" | "right" }` 和 `{ cols: Array, align?: "left" | "right" }` - 嵌套布局容器；每组连续项成为一个 Toolbar 组
- `"prev"`、`"next"`、`"today"` - 日期导航按钮
- `"date"` - 当前日期标签
- `"day"`、`"week"`、`"month"` 或任意已注册视图名称 - 视图选项卡
- `"spacer"` - 将后续项推向右侧的弹性空项
- `"minicalendar"`、`"button"` 或 `{ view: "..." }` - 对应的旧式标题项
- `{ html, click, css, width, height }` 或不含 `id`、`view`、`rows`、`cols` 的对象 - 旧式自定义按钮。`html` 提供内容，`click` 运行时 `this` 指向项节点。

## Toolbar 项格式

以下格式仅在启用 `toolbar: true` 时可用：

- `"views"` - 视图选择器，默认为 segmented。菜单使用 `{ id: "views", comp: "menu" }`，通过 `options` 选择和排序视图。
- `"add_event"` - 新建事件操作。
- `"toggle_sidebar"` - 切换 Sidebar 插件。
- `"|"` - 可视分隔符。
- `{ id, comp, label, ... }` - UI kit 项。匹配内置项的 `id` 会自定义该项，其他 ID 创建自定义项。
- `{ id, comp: "container" }` - 空宿主，在 `onToolbarItemRender` 中填充。

`comp` 可以是 `button`、`toggle`、`menu`、`combo`、`segmented`、`text`、`stepper`、`datepicker`、`separator`、`spacer` 或 `container`。自定义项可使用 `label`、`icon`、`tooltip`、`css`、`width`、`height`、`align`、`disabled`、`hidden`、`value`、`placeholder`、`options`、`items` 和 `config`。`options` 配置 `combo`/ `segmented`，`items` 配置 `menu`，`config` 提供组件设置。

不要将 `id` 与旧式 `view`、`html` 或 `click` 组合：它仍是旧式项，Scheduler 会记录警告。自定义 Toolbar 操作请使用 `onToolbarItemClick` 和 `onToolbarItemChange`。

### Toolbar 配置示例

每个示例都请在初始化前启用插件：

~~~js
scheduler.plugins({ toolbar: true, minical: true });
~~~

**1. 带 segmented 视图选择器的标准导航**

~~~js
scheduler.config.header = [
    "add_event", "spacer", "prev", "date", "next", "today",
    { id: "views", comp: "segmented", options: ["day", "week", "month"] }
];
~~~

**2. 自定义 UI kit 控件和分隔符**

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

**3. 包含旧式项和应用内容的双行布局**

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