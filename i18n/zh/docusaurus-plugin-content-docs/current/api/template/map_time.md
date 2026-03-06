---
sidebar_label: "map_time"
title: "map_time template"
description: "设置视图第一列显示的日期"
---

# map_time

### Description

@short: 设置视图第一列显示的日期

@signature: map_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期   
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件对象

### Returns
- ` text` - (string) - 在scheduler中显示的html文本

### Example

~~~jsx
scheduler.templates.map_time = function(start,end,ev){
    if (ev._timed)
        return this.day_date(ev.start_date, ev.end_date, ev) + " " + 
        this.event_date(start);
    else
        return scheduler.templates.day_date(start) + " &ndash; " + 
        scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 该template需要启用[map_view](guides/extensions-list.md#mapview)插件。 
:::

### Related Guides
- [Map View 템플릿](views/map-view-templates.md)
