---
title: "扩展功能完整列表"
sidebar_label: "扩展功能完整列表"
---

# 扩展功能完整列表

dhtmlxScheduler 提供多种扩展功能，以增强默认功能。

要启用扩展，请通过 [scheduler.plugins](api/method/plugins.md) 方法激活。

:::info
从 v6.0 开始，扩展代码文件已从 **ext** 文件夹中移除，并合并进 *dhtmlxscheduler.js* 文件。

如果你使用的是 dhtmlxScheduler 5.3 或更早版本，请参考 [迁移指南](migration.md#53---60)。
:::

## Active Links {#activelinks}

在"月视图"和"周视图"中，将日期数字显示为可点击链接，点击后可打开所选视图中的对应日期。

~~~js
scheduler.plugins({
    active_links: true
});
~~~

#### 相关资源

文章:[月视图](views/month.md#presentingdaysnumbersasclickablelinks)


API: [active_link_view](api/config/active_link_view.md) 


[Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)


## Agenda View {#agenda-view}

这是 Agenda 视图的代码文件。

~~~js
scheduler.plugins({
    agenda_view: true
});
~~~

#### 相关资源

文章:[아젠다 뷰](views/agenda.md) 


[Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)


## All Timed {#all-timed}

将多天事件以与单天事件相同的样式显示。

~~~js
scheduler.plugins({
    all_timed: true
});
~~~

#### 相关资源

API: [all_timed](api/config/all_timed.md) 


[Displaying multi-day events in the regular way](https://docs.dhtmlx.com/scheduler/samples/03_extensions/26_multi_day_visible.html)


## Collision {#collision}

处理在同一时间段内发生的多个事件。

~~~js
scheduler.plugins({
    collision: true
});
~~~


#### 相关资源

文章:[타임 슬롯에서 중복 이벤트 방지하기](guides/collisions.md) 


[Controlling the number of events in a time slot](https://docs.dhtmlx.com/scheduler/samples/03_extensions/15_collision.html)


## Container Autoresize {#containerautoresize}

自动调整调度器容器大小以适应内容。

~~~js
scheduler.plugins({
    container_autoresize: true
});
~~~

#### 相关资源

文章:[dhtmlxScheduler를 순수 JS/HTML에서 사용하기](guides/initialization.md#container-autoresizing)


API: [container_autoresize](api/config/container_autoresize.md) 


[Autoresizing the scheduler container](https://docs.dhtmlx.com/scheduler/samples/03_extensions/28_container_autoresize.html)


## Cookie {#cookie}

使用 cookie 存储当前调度器状态（模式和日期）。

~~~js
scheduler.plugins({
    cookie: true
});
~~~

#### 相关资源

[Work with cookies](https://docs.dhtmlx.com/scheduler/samples/03_extensions/08_cookies_plugin.html)


## Daytimeline {#daytimeline}

:::info
此扩展仅在 PRO 版本中提供
:::

为时间线视图提供 "Days" 模式。

~~~js
scheduler.plugins({
    daytimeline: true
});
~~~


#### 相关资源

文章:[타임라인 뷰](views/timeline.md)


[Days as Timeline rows](https://docs.dhtmlx.com/scheduler/samples/06_timeline/14_days_as_sections.html)


## Drag-n-Drop zwischen Schedulern {#drag-n-drop-between-schedulers}

:::info
此扩展仅在 Scheduler PRO 版本（Commercial（自 2021 年 10 月 6 日起）、Enterprise 和 Ultimate 许可证）中提供。
:::

允许在多个调度器之间拖放事件，实现事件从一个调度器移动到另一个调度器。

~~~js
scheduler.plugins({
    drag_between: true
});
~~~

#### 相关资源

文章:[调度器之间的拖放](guides/drag-between.md)


## Editors {#editors}

包含 lightbox 中使用的 [radio](guides/radio.md)、[combo](guides/combo.md)、[checkbox](guides/checkbox.md) 控件的代码。

~~~js
scheduler.plugins({
    editors: true
});
~~~


#### 相关资源

文章:[Lightbox 컨트롤](guides/lightbox-editors.md) 


[Radio button in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/14_radio_buttons_section.html)


## Expand {#expand}

在调度器右上角添加"展开"图标，点击可在原始大小和全屏之间切换。

~~~js
scheduler.plugins({
    expand: true
});
~~~


#### 相关资源

API: [expand](api/method/expand.md), [collapse](api/method/collapse.md) 


事件: [onBeforeExpand](api/event/onbeforeexpand.md), [onBeforeCollapse](api/event/onbeforecollapse.md), [onExpand](api/event/onexpand.md), [onCollapse](api/event/oncollapse.md)
 

[Full-screen view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/05_expand_plugin.html)


## Export service {#export-service}

启用在线导出服务。

~~~js
scheduler.plugins({
    export_api: true
});
~~~

#### 相关资源

文章:[Export to PDF](export/pdf.md) , [Export to PNG](export/png.md)


[Export to PDF/PNG](https://docs.dhtmlx.com/scheduler/samples/04_export/06_online_export.html)


## Grid View {#gridview}

:::info
此扩展仅在 PRO 版本中提供
:::

Grid 视图的代码文件。

~~~js
scheduler.plugins({
    grid_view: true
});
~~~


#### 相关资源

文章:[Grid View](views/grid.md)


[Grid view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/27_grid_view.html)


## HTML Templates {#html-templates}

允许使用 HTML 代码定义模板。

~~~js
scheduler.plugins({
    html_templates: true
});
~~~

#### 相关资源

文章:[模板](guides/templates.md#specifyingtemplatesasanhtmlcode)


[Specifying templates with HTML](https://docs.dhtmlx.com/scheduler/samples/03_extensions/09_html_templates_plugin.html)


## Keyboard Navigation {#keyboard-navigation}

启用键盘导航。

~~~js
scheduler.plugins({
    key_nav: true
});
~~~

#### 相关资源

文章:[키보드 내비게이션](guides/keyboard-navigation.md)


[Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)


[Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)


## Legacy {#legacy}

激活已弃用 API 的支持。

~~~js
scheduler.plugins({
    legacy: true
});
~~~

#### 相关资源

文章:[Migration From Older Versions](migration.md)


## Limit {#limit}

提供阻止和高亮特定日期的选项。

~~~js
scheduler.plugins({
    limit: true
});
~~~

#### 相关资源

文章:[Blocking and Marking Dates](guides/limits.md)


[Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)


## Map View {#mapview}

Map 视图的代码文件。

~~~js
scheduler.plugins({
    map_view: true
});
~~~

#### 相关资源

文章:[Map View](views/map.md)


[Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/19_map_view.html)


## Mini Calendar (Date Picker) {#minicalendardatepicker}

添加迷你日历的插件。

~~~js
scheduler.plugins({
    minical: true
});
~~~

#### 相关资源

文章:[미니 캘린더(날짜 선택기)](guides/minicalendar.md), [시간 및 날짜](guides/time.md#minicalendarinthelightbox)


[Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)


## Multisection {#multisection}

:::info
此扩展仅在 PRO 版本中提供
:::

允许在时间线视图中为事件分配多个区段，或在单位视图中分配多个单位。

~~~js
scheduler.plugins({
    multisection: true
});
~~~

#### 相关资源

文章:[타임라인 뷰](views/timeline.md#assignmentofeventstoseveralsections), [Units View](views/units.md#assigningeventstoseveralunits)


API: [multisection](api/config/multisection.md)


[Multisection events in Timeline and Units view](https://docs.dhtmlx.com/scheduler/samples/12_multisection_events/01_multisection_events.html)


## Multiselect {#multiselect}

为 lightbox 添加 [multiselect](guides/multiselect.md) 控件的支持。

~~~js
scheduler.plugins({
    multiselect: true
});
~~~

#### 相关资源

文章:[Lightbox 컨트롤](guides/lightbox-editors.md)


[Multiselect control in the lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/21_multiselect_options.html)


## Multisource {#multisource}

支持从多个数据源加载数据。

~~~js
scheduler.plugins({
    multisource: true
});
~~~

#### 相关资源

文章:[데이터 불러오기](guides/loading-data.md#loadingdatafrommultiplesources)


[Loading data from multiple sources](https://docs.dhtmlx.com/scheduler/samples/03_extensions/13_multisource.html)


## Outerdrag {#outerdrag}

允许从外部 DHTMLX 组件（如 dhtmlxTree）拖动事件。

~~~js
scheduler.plugins({
    outerdrag: true
});
~~~


#### 相关资源

文章:[드래그 앤 드롭(Drag-and-Drop) 작업](guides/drag-between.md)


[Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)


## PDF {#pdf}

支持导出为 PDF 文档。

- [导出为 PDF（4.0 版本）](export/pdf-legacy.md)

- [导出为 PDF（4.1+ 版本）](export/pdf.md)


## Quick Info {#quickinfo}

显示包含事件详细信息的弹出窗口。

~~~js
scheduler.plugins({
    quick_info: true
});
~~~


#### 相关资源

文章:[Mobile Responsive Scheduler](guides/touch-support.md)


[Touch-oriented scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/29_quick_info.html)


## Readonly {#readonly}

为 lightbox 和部分事件启用只读模式。

~~~js
scheduler.plugins({
    readonly: true
});
~~~


#### 相关资源

文章:[읽기 전용 모드](guides/readonly.md)


[Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)


## Recurring {#recurring}

添加对周期性事件的支持。

~~~js
scheduler.plugins({
    recurring: true
});
~~~


#### 相关资源

文章:[반복 이벤트](guides/recurring-events.md)


[Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
 

## Recurring Legacy {#recurring-legacy}

为周期性事件提供旧版支持。

~~~js
scheduler.plugins({
    recurring_legacy: true
});
~~~

#### 相关资源

文章:[Recurring Events (v7.1 이하)](guides/recurring-events-legacy.md)


## Serialize {#serialize}

支持将数据序列化为 ICal、XML 和 JSON 格式。

~~~js
scheduler.plugins({
    serialize: true
});
~~~


#### 相关资源

文章:[데이터 직렬화: XML, JSON, iCal](export/serialization.md)


 

[Serialize scheduler events](https://docs.dhtmlx.com/scheduler/samples/04_export/01_serialize_data.html)


## Timeline {#timeline}

:::info
此扩展仅在 PRO 版本中提供
:::

时间线视图插件。

~~~js
scheduler.plugins({
    timeline: true
});
~~~


#### 相关资源

文章:[타임라인 뷰](views/timeline.md)


[Bar mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/02_lines.html)


## Tooltip {#tooltip}

为事件启用工具提示。

~~~js
scheduler.plugins({
    tooltip: true
});
~~~


#### 相关资源

文章:[툴팁 (Tooltips)](guides/tooltips.md)


[Tooltips](https://docs.dhtmlx.com/scheduler/samples/03_extensions/20_tooltip.html)


## Treetimeline {#treetimeline}

:::info
此扩展仅在 PRO 版本中提供
:::

为时间线视图提供 "Tree" 模式。

~~~js
scheduler.plugins({
    treetimeline: true
});
~~~


#### 相关资源

文章:[타임라인 뷰](views/timeline.md)


[Tree mode](https://docs.dhtmlx.com/scheduler/samples/06_timeline/03_tree.html)


## Units {#units}

:::info
此扩展仅在 PRO 版本中提供
:::

单位视图扩展。

~~~js
scheduler.plugins({
    units: true
});
~~~


#### 相关资源

文章:[Units View](views/units.md)


[Units view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/02_units_view.html)


## URL {#url}

将调度器的状态（日期、事件 ID、视图）存储在 URL 中。

示例:
~~~js
<code>10_url_date_plugin.html#date=2014-08-01,mode=month</code>
 或 
<code>10_url_date_plugin.html#event="15"</code>
~~~

~~~js
scheduler.plugins({
    url: true
});
~~~


#### 相关资源

[Saving the scheduler state in URL](https://docs.dhtmlx.com/scheduler/samples/03_extensions/10_url_date_plugin.html)


## Week Agenda {#weekagenda}

:::info
此扩展仅在 PRO 版本中提供
:::

Week Agenda 视图的代码文件。

~~~js
scheduler.plugins({
    week_agenda: true
});
~~~


#### 相关资源

文章:[Week Agenda View](views/weekagenda.md)


[WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)


## Year {#year}

Year 视图的代码文件。

~~~js
scheduler.plugins({
    year_view: true
});
~~~

#### 相关资源

文章:[Year View](views/year.md)


[Year view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/04_year_view.html)
