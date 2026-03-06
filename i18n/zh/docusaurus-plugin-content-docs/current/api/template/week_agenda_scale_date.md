---
sidebar_label: "week_agenda_scale_date"
title: "week_agenda_scale_date template"
description: "视图中日单元格显示的日期"
---

# week_agenda_scale_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 视图中日单元格显示的日期

@signature: week_agenda_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
scheduler.templates.week_agenda_scale_date = function(date) {
        var scale_date_format = scheduler.date.date_to_str("%l, %F %d");
        return scale_date_format(date);
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 此template需要启用[week_agenda](guides/extensions-list.md#weekagenda)插件。 
:::

### Related Guides
- [WeekAgenda 뷰 템플릿](views/weekagenda-view-templates.md)
