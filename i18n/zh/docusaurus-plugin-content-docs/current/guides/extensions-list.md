---
title: "全部扩展列表"
sidebar_label: "全部扩展列表"
---

# 全部扩展列表

dhtmlxScheduler 包含若干扩展，为标准行为添加额外功能。

要使用扩展，请通过 [`plugins()`](api/method/plugins.md) 方法激活它。

:::info
在 v6.0 版本中，扩展代码文件已从调度器代码库的 **ext** 文件夹中移除，并合并到 *dhtmlxscheduler.js* 文件中。

如果你使用的是 dhtmlxScheduler 5.3 及更早版本，请查阅 [迁移文章](migration.md#53---60)。
:::

## Active Links

将 Month（月视图）和 Week（周视图）中的日期数字显示为可点击的链接，点击后在指定的视图中打开相关日期。

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### 相关资源

文章: [Month View](views/month.md)

API: [active_link_view](api/config/active_link_view.md)

示例: [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)

## Agenda View

Agenda 视图的代码文件。

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### 相关资源

文章: [Agenda View](views/agenda.md)

示例: [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

## All Timed

以常规方式显示多日事件（如同将多天事件显示为单日事件）。

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### 相关资源

API: [all_timed](api/config/all_timed.md) 

示例: [Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)

## Collision

管理时间槽中的事件数量。

~~~js
scheduler.plugins({
    collision: true
});
~~~

#### 相关资源

文章: [Preventing Double Events in a Time Slot](guides/collisions.md) 

示例: [Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)

## Container Autoresize

为调度器容器启用自动调整大小（内容适配容器尺寸）。

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### 相关资源

文章: [dhtmlxScheduler in Plain JS/HTML](guides/initialization.md#scheduler-autoresizing)

API: [container_autoresize](api/config/container_autoresize.md) 

示例: [Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)

## Cookie

将调度器当前状态（模式和日期）保存在 Cookies 中。

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### 相关资源

示例: [Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)

## Daytimeline

:::note
此扩展仅在 PRO 版本可用
:::

Timeline 视图的 “Days” 模式的代码文件。

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~

#### 相关资源

文章: [Timeline View](views/timeline.md)

示例: [Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop between Schedulers

:::info
此扩展仅在 Scheduler PRO 版本（商业许可（自 2021 年 10 月 6 日起）、企业版和 Ultimate 许可证）中可用。
:::

允许在多个调度器之间进行拖放操作，从一个调度器拖动事件到另一个调度器，反之亦然。

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### 相关资源

文章: [Drag-and-drop between Schedulers](guides/drag-between.md)

## Editors

用于 Lightbox 的 [radio](guides/radio.md)、[combo](guides/combo.md)、[checkbox](guides/checkbox.md) 控件的代码文件。

~~~js
scheduler.plugins({
    editors: true
});
~~~

#### 相关资源

文章: [Lightbox Editors](guides/lightbox-editors.md)

示例: [Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)

## Expand

在调度器右上角添加 “expand” 图标。点击该图标可将调度器的尺寸从原始大小切换为“全屏”，再切换回原始大小。

~~~js
scheduler.plugins({
    expand: true
});
~~~

#### 相关资源

API: [`expand()`](api/method/expand.md), [`collapse()`](api/method/collapse.md)

事件: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)

示例: [Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)

## Export service

提供启用在线导出服务的选项。

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### 相关资源

文章: [Export to PDF](export/pdf.md), [Export to PNG](export/png.md)

示例: [Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)

## Grid View

:::info
此扩展仅在 PRO 版本可用
:::

Grid 视图的代码文件。

~~~js
scheduler.plugins({
    grid_view: true
});
~~~

#### 相关资源

文章: [Grid View](views/grid.md)

示例: [Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)

## HTML Templates

允许将模板定义为 HTML 代码。

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### 相关资源

文章: [Templates](guides/templates.md#specifying-templates-with-code)

示例: [Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation

启用键盘导航。

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### 相关资源

文章: [Keyboard Navigation](guides/keyboard-navigation.md)

示例: [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

示例: [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

## Legacy

启用已弃用的 API。

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### 相关资源

文章: [Migration From Older Versions](migration.md)

## Limit

提供阻止和突出显示日期的功能。

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### 相关资源

文章: [Blocking and Marking Dates](guides/limits.md)

示例: [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View

Map 视图的代码文件。

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### 相关资源

文章: [Map View](views/map.md)

示例: [Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker)

一个用于迷你日历的插件。

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### 相关资源

文章: [Mini Calendar (Date Picker)](guides/minicalendar.md), [Time and Date](guides/time.md#mini-calendar-in-the-lightbox)

示例: [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection

:::info
此扩展仅在 PRO 版本可用
:::

允许在 Timeline 视图中将事件分配到多个部分，或在 Units 视图中分配到多个单元。

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### 相关资源

文章: [Timeline View](views/timeline.md), [Units View](views/units.md)

API: [multisection](api/config/multisection.md)

示例: [Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect

用于 Lightbox 的 [multiselect](guides/multiselect.md) 控件的扩展。

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### 相关资源

文章: [Lightbox Editors](guides/lightbox-editors.md)

示例: [Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource

提供从多个数据源加载数据的功能。

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### 相关资源

文章: [Loading Data](guides/loading-data.md#loading-data-from-multiple-sources)

示例: [Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag

允许从外部 DHTMLX 组件（如 dhtmlxTree）拖拽事件。

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~

#### 相关资源

文章: [Drag-and-Drop Operations](guides/drag-between.md)

示例: [Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF

提供导出为 PDF 文档的功能。

- [Export to PDF (version 4.0)](export/pdf-legacy.md)

- [Export to PDF (version 4.1+)](export/pdf.md)


## Quick Info

提供一个包含事件详情的弹出框。

~~~js
scheduler.plugins({
    quick_info: true
});
~~~

#### 相关资源

文章: [Mobile Responsive Scheduler](guides/touch-support.md)

示例: [Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly

为 Lightbox 和特定事件提供只读模式。

~~~js
scheduler.plugins({
    readonly: true
});
~~~

#### 相关资源

文章: [Read-only Mode](guides/readonly.md)

示例: [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring

为重复事件提供支持。

~~~js
scheduler.plugins({
    recurring: true
});
~~~

#### 相关资源

文章: [Recurring Events](guides/recurring-events.md)

示例: [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)


## Recurring Legacy

重复事件的旧引擎。

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### 相关资源

文章: [Recurring Events (up to v7.1)](guides/recurring-events-legacy.md)


## Serialize

提供序列化为 ICal、XML、JSON 格式的支持。

~~~js
scheduler.plugins({
    serialize: true
});
~~~

#### 相关资源

文章: [Data Serialization to XML, JSON, iCal](export/serialization.md)

示例: [Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline

:::info
此扩展仅在 PRO 版本可用
:::

Timeline 视图插件。

~~~js
scheduler.plugins({
    timeline: true
});
~~~

#### 相关资源

文章: [Timeline View](views/timeline.md)

示例: [Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip

为事件启用工具提示。

~~~js
scheduler.plugins({
    tooltip: true
});
~~~

#### 相关资源

文章: [Tooltips](guides/tooltips.md)

示例: [Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline

:::info
此扩展仅在 PRO 版本可用
:::

用于 Timeline 视图的 “Tree” 模式的扩展。

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~

#### 相关资源

文章: [Timeline View](views/timeline.md)

示例: [Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units

:::info
此扩展仅在 PRO 版本可用
:::

Units 视图扩展。

~~~js
scheduler.plugins({
    units: true
});
~~~

#### 相关资源

文章: [Units View](views/units.md)

示例: [Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL

将调度器的状态（日期、事件 ID、视图）保存在 URL 中。

例如：

```text
10_url_date_plugin.html#date=2027-08-01,mode=month
10_url_date_plugin.html#event=15
```

~~~js
scheduler.plugins({
    url: true
});
~~~

#### 相关资源

示例: [Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda

:::info
此扩展仅在 PRO 版本可用
:::

Week Agenda 视图的代码文件。

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~

#### 相关资源

文章: [Week Agenda View](views/weekagenda.md)

示例: [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year

Year 视图的代码文件。

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### 相关资源

文章: [Year View](views/year.md)

示例: [Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)