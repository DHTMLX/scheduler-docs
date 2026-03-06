---
sidebar_label: "TIMELINE_cell_class"
title: "TIMELINE_cell_class template"
description: "设置将分配给视图中单元格的CSS类"
---

# TIMELINE_cell_class
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置将分配给视图中单元格的CSS类

@signature: TIMELINE_cell_class: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - 包含单元格内事件对象的数组（仅在"cell"模式下可用）
- `date` - (required) *Date* - 对应列的日期
- `section` - (required) *object* - 节对象

### Returns
- ` css_class` - (string) - 应用于元素的CSS类

### Example

~~~jsx
scheduler.templates.timeline_cell_class = function(evs, date, section){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 此模板需要启用[timeline](guides/extensions-list.md#timeline)插件。 
:::

### Related API
- [`TIMELINE_row_class`](api/template/timelinename_row_class.md)

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
