---
sidebar_label: "GRID_field"
title: "GRID_field template"
description: "定义列中显示的文本"
---

# GRID_field
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义列中显示的文本

@signature: GRID_field: (field_name: string, event: object) =\> string;

### Parameters

- `field_name` - (required) *string* - 列的标识符  
- `event` - (required) *object* - 事件数据

### Returns
- ` text` - (string) - 用于在scheduler中显示的HTML内容

### Example

~~~jsx
scheduler.templates.grid_field = function(field_name, event){
    return event[field_name];
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 该模板仅在启用 [grid_view](guides/extensions-list.md#gridview) 插件时生效。 
:::

请注意，此模板不适用于 id='date'、id='start_date' 或 id='end_date' 的列。这些列使用 
[GRID_full_date](api/template/gridname_full_date.md) 和 [GRID_single_date](api/template/gridname_single_date.md) 
模板。

### Related Guides
- [그리드 뷰 템플릿](views/grid-view-templates.md)
