---
sidebar_label: "TIMELINE_scaley_class"
title: "TIMELINE_scaley_class template"
description: "定义将分配给Y轴项目的CSS类名"
---

# TIMELINE_scaley_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义将分配给Y轴项目的CSS类名

@signature: TIMELINE_scaley_class: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - 该部分的标识符
- `label` - (required) *string* - 该部分的标签
- `section` - (required) *object* - 表示该部分的对象，包含 'key' 和 'label' 属性

### Returns
- ` css_class` - (string) - 将应用于对应元素的CSS类

### Example

~~~jsx
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板需要启用[timeline](guides/extensions-list.md#timeline) 插件。 
:::

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
