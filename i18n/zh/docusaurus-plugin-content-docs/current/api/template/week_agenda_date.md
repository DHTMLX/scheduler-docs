---
sidebar_label: "week_agenda_date"
title: "week_agenda_date template"
description: "定义在 Week Agenda 视图头部显示的日期"
---

# week_agenda_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义在 Week Agenda 视图头部显示的日期

@signature: week_agenda_date: (start: Date, end: Date) =\> void

### Parameters

- `start` - (required) *Date* - 视图的起始日期
- `end` - (required) *Date* - 视图的结束日期

### Example

~~~jsx
scheduler.templates.week_agenda_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 该模板仅在启用 [week_agenda](guides/extensions-list.md#weekagenda) 插件时生效。 
:::

### Related Guides
- [WeekAgenda 뷰 템플릿](views/weekagenda-view-templates.md)

### Change log
- 在 v6.0 中添加
