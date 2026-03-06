---
sidebar_label: "GRID_single_date"
title: "GRID_single_date template"
description: "定义在 id='start_date' 或 id='end_date' 列中日期的显示方式"
---

# GRID_single_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义在 id='start_date' 或 id='end_date' 列中日期的显示方式

@signature: GRID_single_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 需要格式化的日期

### Returns
- ` text` - (string) - 用于渲染 scheduler 的 html 文本

### Example

~~~jsx
scheduler.templates.grid_single_date = function(date){
    return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 该模板在启用 [grid_view](guides/extensions-list.md#gridview) 插件时生效。 
:::

### Related API
- [GRID_full_date](api/template/gridname_full_date.md)

### Related Guides
- [그리드 뷰 템플릿](views/grid-view-templates.md)
