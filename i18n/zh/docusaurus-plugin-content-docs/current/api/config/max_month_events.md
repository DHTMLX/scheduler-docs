---
sidebar_label: "max_month_events"
title: "max_month_events config"
description: "控制单个单元格中显示的最大事件数量"
---

# max_month_events

### Description

@short: 控制单个单元格中显示的最大事件数量

@signature: max_month_events: number

### Example

~~~jsx
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2027,5,30),"month");
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

当分配给单元格的事件数量超过此限制时，scheduler 会显示一个"View more"链接。点击该链接会将用户带到日视图，在那里可以完整列出该天的所有事件。

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Month View](views/month.md#limitingthenumberofeventsinacell)
