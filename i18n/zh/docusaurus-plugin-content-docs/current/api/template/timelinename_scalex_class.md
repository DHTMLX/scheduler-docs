---
sidebar_label: "TIMELINE_scalex_class"
title: "TIMELINE_scalex_class template"
description: "定义将分配给X轴项目的CSS类名称"
---

# TIMELINE_scalex_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义将分配给X轴项目的CSS类名称

@signature: TIMELINE_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` css_class` - (string) - 对应元素的css类

### Example

~~~jsx
scheduler.templates.timeline_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 此模板需要启用[timeline](guides/extensions-list.md#timeline) 插件。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
