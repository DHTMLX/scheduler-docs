---
sidebar_label: "week_agenda_event_text"
title: "week_agenda_event_text template"
description: "定义事件显示的文本内容"
---

# week_agenda_event_text
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义事件显示的文本内容

@signature: week_agenda_event_text: (start: Date, end: Date, event: any, cellDate: Date, pos: string) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件数据对象
- `cellDate` - (required) *Date* - 单日事件或周期性事件单个实例所在的日期单元格日期
- `pos` - (required) *string* - 此发生在周期性事件中的位置:'start' 表示第一个，'end' 表示最后一个，'middle' 表示其他所有位置

### Returns
- ` text` - (string) - 用于在 scheduler 中渲染事件的 html 内容

### Example

~~~jsx
scheduler.templates.week_agenda_event_text = function(start,end,event,cellDate,pos){
    return scheduler.templates.event_date(start_date) + " " + event.text;
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 该模板仅在启用 [week_agenda](guides/extensions-list.md#weekagenda) 插件时有效。 
:::

### Related Guides
- [WeekAgenda 뷰 템플릿](views/weekagenda-view-templates.md)
