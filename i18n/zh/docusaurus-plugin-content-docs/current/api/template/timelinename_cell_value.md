---
sidebar_label: "TIMELINE_cell_value"
title: "TIMELINE_cell_value template"
description: "表示视图中单元格内排定的事件数量"
---

# TIMELINE_cell_value
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 表示视图中单元格内排定的事件数量

@signature: TIMELINE_cell_value: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - 包含该单元格内事件对象的数组
- `date` - (required) *Date* - 对应单元格的日期
- `section` - (required) *object* - 对应的 section 对象

### Returns
- ` text` - (string) - 用于在 scheduler 中渲染的 html 文本

### Example

~~~jsx
scheduler.templates.timeline_cell_value = function(evs, date, section){
    return evs ? evs.length : "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 该模板需要启用 [timeline](guides/extensions-list.md#timeline) 插件。 
:::

:::note

默认情况下，该模板仅在 Timeline 视图的 'cell' 模式下触发。但是，如果开启了 [Timeline 视图](api/method/createtimelineview.md) 的 **cell_template** 选项，该模板也会在[视图的所有其他模式](views/timeline.md#customcontentincells)中被调用。
 
:::

### Related API
- [`TIMELINE_row_class`](api/template/timelinename_row_class.md)

### Related Guides
- [타임라인 뷰 템플릿](views/timeline-view-templates.md)
