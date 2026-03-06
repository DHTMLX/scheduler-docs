---
sidebar_label: "onViewMoreClick"
title: "onViewMoreClick event"
description: "当用户点击月视图中的'View more'链接时触发（仅适用于月视图）"
---

# onViewMoreClick

### Description

@short: 当用户点击月视图中的"View more"链接时触发（仅适用于月视图）

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (required) *object* - 用户点击"View more"链接所在单元格的日期

### Returns
- ` result` - (boolean) - 决定是否执行默认事件动作，返回<b>true</b>则继续，返回<b>false</b>则阻止

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    // 在此处添加自定义逻辑
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

此事件可以被阻止。返回*false*将阻止月视图在点击"View more"链接后切换到日视图。

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- [Month View](views/month.md#limitingthenumberofeventsinacell)
