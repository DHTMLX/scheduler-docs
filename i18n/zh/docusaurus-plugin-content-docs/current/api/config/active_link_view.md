---
sidebar_label: "active_link_view"
title: "active_link_view config"
description: "允许月视图中的日期数字显示为可点击的链接，点击后会在指定视图中打开对应的日期。"
---

# active_link_view

### Description

@short: 允许月视图中的日期数字显示为可点击的链接，点击后会在指定视图中打开对应的日期。

@signature: active_link_view: string

### Example

~~~jsx
scheduler.config.active_link_view = "week"; // 指定从月视图跳转到的视图
...
scheduler.init('scheduler_here',new Date(2012,7,6),"month");
~~~

**Default value:** day

**Applicable views:** [Month view](views/month.md)

### Related samples
- [Month days as links](https://docs.dhtmlx.com/scheduler/samples/03_extensions/06_links_plugin.html)
- [Highlighted timespans in Month view](https://docs.dhtmlx.com/scheduler/samples/09_api/07_highlighted_timespans_month_view.html)

### Details

:::note
 该设置需要启用 [active_links](guides/extensions-list.md#activelinks) 插件。 
:::

将此属性设置为希望月份日期数字链接到的视图名称。

### Related Guides
- [Month View](views/month.md#presentingdaysnumbersasclickablelinks)
