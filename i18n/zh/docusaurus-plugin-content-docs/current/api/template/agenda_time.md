---
sidebar_label: "agenda_time"
title: "agenda_time template"
description: "定义在Agenda视图第一列中显示的日期"
---

# agenda_time

### Description

@short: 定义在Agenda视图第一列中显示的日期

@signature: agenda_time: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件的开始日期
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件数据

### Returns
- ` text` - (string) - 用于在scheduler中显示的html内容

### Example

~~~jsx
const templates = scheduler.templates;
scheduler.templates.agenda_time = function(start, end, event){
  if (scheduler.isOneDayEvent(event)) {
    return templates.day_date(event) + " " + templates.event_date(start);
  } else {
    return templates.day_date(start) + " &ndash; " + 
        templates.day_date(end);
  }
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 该模板仅在启用[agenda_view](guides/extensions-list.md#agenda-view)插件时生效。 
:::

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
