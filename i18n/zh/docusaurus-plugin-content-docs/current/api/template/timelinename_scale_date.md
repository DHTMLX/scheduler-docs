---
sidebar_label: "TIMELINE_scale_date"
title: "TIMELINE_scale_date template"
description: "定义X轴上显示的项目"
---

# TIMELINE_scale_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义X轴上显示的项目

@signature: TIMELINE_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中显示的html内容

### Example

~~~jsx
scheduler.templates.timeline_scale_date = function(date){
   var timeline = scheduler.matrix.timeline;
   var func = scheduler.date.date_to_str(timeline.x_date||scheduler.config.hour_date);
   return func(date);
}
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 此模板需要启用[timeline](guides/extensions-list.md#timeline)插件。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
