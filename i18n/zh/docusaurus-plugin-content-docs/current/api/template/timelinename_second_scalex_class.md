---
sidebar_label: "TIMELINE_second_scalex_class"
title: "TIMELINE_second_scalex_class template"
description: "该属性设置一个 CSS 类名，该类名将被添加到第二 X 轴上的项目中。"
---

# TIMELINE_second_scalex_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 该属性设置一个 CSS 类名，该类名将被添加到第二 X 轴上的项目中。

@signature: TIMELINE_second_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` css_class` - (string) - 对应元素的 CSS 类名

### Example

~~~jsx
scheduler.templates.timeline_second_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板需要启用 [timeline](guides/extensions-list.md#timeline) 插件。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
