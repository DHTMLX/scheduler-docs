---
sidebar_label: "month_events_link"
title: "month_events_link template"
description: "控制月视图单元格内'查看更多'链接的显示方式"
---

# month_events_link

### Description

@short: 控制月视图单元格内"查看更多"链接的显示方式

@signature: month_events_link: (date: Date, count: number) =\> string

### Parameters

- `date` - (required) *Date* - 对应月视图单元格的日期
- `count` - (required) *number* - 该单元格中事件的总数

### Returns
- ` text` - (string) - 要在scheduler中显示的html内容

### Example

~~~jsx
// 默认实现
scheduler.templates.month_events_link = function(date, count){
    return "<a>View more("+count+" events)</a>";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Related API
- [max_month_events](api/config/max_month_events.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- [Month View Templates](views/month-view-templates.md)
- [Month View](views/month.md#limitingthenumberofeventsinacell)
