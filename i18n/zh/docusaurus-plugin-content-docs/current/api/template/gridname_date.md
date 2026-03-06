---
sidebar_label: "GRID_date"
title: "GRID_date template"
description: "设置视图头部显示的日期"
---

# GRID_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 设置视图头部显示的日期

@signature: GRID_date: (start: Date, end: Date) =\> string;

### Parameters

- `start` - (required) *Date* - 视图的开始日期
- `end` - (required) *Date* - 视图的结束日期

### Returns
- ` text` - (string) - 用于scheduler渲染的html文本

### Example

~~~jsx
//默认定义
scheduler.templates.grid_date = function(start, end){
    return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 该模板仅在启用[grid_view](guides/extensions-list.md#gridview)插件时生效。 
:::

### Related Guides
- [그리드 뷰 템플릿](views/grid-view-templates.md)
