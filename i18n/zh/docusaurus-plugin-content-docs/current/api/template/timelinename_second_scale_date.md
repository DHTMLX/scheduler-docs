---
sidebar_label: "TIMELINE_second_scale_date"
title: "TIMELINE_second_scale_date template"
description: "定义显示在次要X轴上的项目"
---

# TIMELINE_second_scale_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义显示在次要X轴上的项目

@signature: TIMELINE_second_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html内容

### Example

~~~jsx
scheduler.templates.timeline_second_scale_date = function(date){
    const timeline = scheduler.matrix.timeline;
    const func = scheduler.date.date_to_str(
        (timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
    return func(date);
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该template仅在启用[timeline](guides/extensions-list.md#timeline)插件时有效。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
