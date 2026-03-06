---
sidebar_label: "agenda_text"
title: "agenda_text template"
description: "定义在Agenda视图第二列中显示的文本"
---

# agenda_text

### Description

@short: 定义在Agenda视图第二列中显示的文本

@signature: agenda_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件数据

### Returns
- ` text` - (string) - 在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.agenda_text = function(start,end,ev){
     return ev.text;
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 该模板需要启用[agenda_view](guides/extensions-list.md#agenda-view)插件。 
:::

如果未设置**agenda_text**模板，日期部分'd-m-y'将使用[day_date](api/template/day_date.md)模板中的格式。

### Related Guides
- [Agenda View Templates](views/agenda-view-templates.md)
