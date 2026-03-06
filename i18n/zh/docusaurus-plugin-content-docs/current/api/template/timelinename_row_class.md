---
sidebar_label: "TIMELINE_row_class"
title: "TIMELINE_row_class template"
description: "定义将分配给 Timeline 视图中某行的 CSS 类"
---

# TIMELINE_row_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义将分配给 Timeline 视图中某行的 CSS 类

@signature: TIMELINE_row_class: (section: object, timeline: object) =\> string;

### Parameters

- `section` - (required) *object* - 该 section 对象
- `timeline` - (required) *object* - 该 timeline 对象

### Returns
- ` css_class` - (string) - 对应元素的 css 类名

### Example

~~~jsx
scheduler.templates.timeline_row_class = function(section, timeline){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板需要启用 [timeline](guides/extensions-list.md#timeline) 插件。 
:::

该模板的默认实现如下:

~~~js
scheduler.templates.TIMELINE_row_class = function(section, timeline){
    if(timeline.folder_events_available && section.children){
        return "folder";
    }
    return "";
};
~~~

### Related API
- [`TIMELINE_cell_class`](api/template/timelinename_cell_class.md)
- [`TIMELINE_cell_value`](api/template/timelinename_cell_value.md)

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)

### Change log
- 版本 v5.3.9 中新增
