---
title: "移动端响应式 Scheduler"
sidebar_label: "移动端响应式 Scheduler"
description: "为触控设备以及响应式 Toolbar 和 Sidebar 布局配置 Scheduler v8"
---

# 移动端响应式 Scheduler

Scheduler 支持 iOS、Android、Windows 平板、触摸屏显示器和手机上的触控输入。每个视图都可使用触控手势。在小屏幕上，请同时配置应用布局和日历。

:::note
本指南介绍 v8.0 Toolbar 和 Sidebar 布局。保留旧式导航栏的应用可继续使用 [v7.2 响应式标题方案](guides/touch-support-legacy.md)。
:::

对于触控应用：

- 包含 `<meta name="viewport" content="width=device-width, initial-scale=1">`；
- 使用 [Material 皮肤](guides/skins.md#material-skin)或控件足够大的其他主题；
- 用户需要紧凑事件编辑器时启用 [Quick Info](guides/quick-info.md) 插件；
- 内置 lightbox 需要适应窄屏时启用 `responsive_lightbox`。

## 响应式 Toolbar

启用 Toolbar 插件并提供完整和紧凑版 `scheduler.config.header`。使用 `onLayoutSizeChange` 进行选择：

~~~js
const compactHeader = {
    rows: [
        { cols: ["prev", "date", "next"] },
        { cols: ["today", { id: "views", comp: "menu" }] }
    ]
};

const fullHeader = [
    "toggle_sidebar", "add_event", "spacer",
    "prev", "date", "next", "spacer", "today", "views"
];

scheduler.plugins({ toolbar: true, sidebar: true });

scheduler.attachEvent("onLayoutSizeChange", ({ width }) => {
    scheduler.config.header = width < 700 ? compactHeader : fullHeader;
});

scheduler.init("scheduler_here", new Date(), "week");
~~~

该事件报告布局外壳（传给 `scheduler.init()` 的元素）的宽度。请使用此值而非 `window.innerWidth`，因为 Scheduler 可能只占页面一部分。不要根据日历高度选择标题；在一行和两行 Toolbar 之间切换会改变高度并可能产生调整大小循环。

Toolbar 在 `onLayoutSizeChange` 后重新读取 `config.header`，因此会在同一次渲染中使用所选结构。结构未更改时会保留现有控件和框架组件。

`scheduler.xy.nav_height = 0` 隐藏导航栏。正值不会设置高度。需要固定 Toolbar 高度时，请使用正数 `config.header.height` 或 CSS 变量 `--dhx-scheduler-toolbar-height`。

## 响应式 Sidebar

Sidebar 与 Toolbar 使用相同的外壳宽度：

~~~js
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

低于 `overlay_width` 时，若内置或独立 Toolbar 中存在可见的 `toggle_sidebar` 项，Sidebar 会成为关闭的覆盖层。没有该控件时，Sidebar 保持停靠，以免无法访问。`scheduler.ext.sidebar.show()` 和 `hide()` 等运行时调用会改变可见状态，但不重写 `config.sidebar.collapsed`。

完整配置请参阅[应用布局](guides/application-layout.md)、[Toolbar](guides/toolbar.md)和 [Sidebar](guides/sidebar.md)。

## 容器自动调整大小

在可滚动父元素中使用 `container_autoresize` 时，请为父元素的垂直滚动条预留空间，否则滚动条可能在响应式断点反复改变外壳宽度：

~~~css
.scheduler-scroll-container {
    overflow: auto;
    scrollbar-gutter: stable;
}
~~~

在 Toolbar 或 Sidebar 外壳中，`container_autoresize` 写入的高度不会触发 `onSchedulerResize`。应用布局决策请使用 `onLayoutSizeChange`。

## 响应式 lightbox

为内置 lightbox 启用响应式样式：

~~~js
scheduler.config.responsive_lightbox = true;
~~~

窄屏上 lightbox 会获得 `dhx_cal_light_responsive` 类。可使用它添加应用特定的响应式样式。

## 触控配置选项

- [touch](api/config/touch.md) 启用或禁用触控支持；
- [touch_drag](api/config/touch_drag.md) 设置区分长按和滚动的延迟；
- [touch_swipe_dates](api/config/touch_swipe_dates.md) 启用水平滑动日期导航；
- [touch_tip](api/config/touch_tip.md) 控制触控提示；
- [touch_tooltip](api/config/touch_tooltip.md) 控制触控工具提示；
- [responsive_lightbox](api/config/responsive_lightbox.md) 启用响应式 lightbox 样式。

## Scheduler 中的触控手势 {#touch-gestures-in-the-scheduler}

- **双击**与双击鼠标相同，可打开或创建事件。
- **长按并拖动**可移动事件或在空时间段创建事件。
- **滑动**在启用 `touch_swipe_dates` 时移至上一个或下一个日期范围。

启用 Toolbar 时，水平滑动使用与 `prev` 和 `next` 控件相同的可取消 `onToolbarItemClick` 操作路径。

## Quick Info 扩展 {#quick-info-extension}

[Quick Info](guides/quick-info.md) 插件提供适合触控的事件摘要和操作按钮。请在初始化前启用：

~~~js
scheduler.plugins({ quick_info: true });
~~~

Quick Info 使用 `quick_info_content`、`quick_info_date` 和 `quick_info_title` 模板。运行时方法和事件包括 `showQuickInfo`、`hideQuickInfo`、`onQuickInfo` 和 `onAfterQuickInfo`。

[响应式应用布局示例](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)