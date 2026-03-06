---
sidebar_label: "GRID_full_date"
title: "GRID_full_date template"
description: "定义在 id='date' 的列中日期的显示方式"
---

# GRID_full_date
:::info
 此功能仅在 PRO 版本中可用。 
:::
### Description

@short: 定义在 id='date' 的列中日期的显示方式

@signature: GRID_full_date: (start: Date, end: Date, ev: object) =\> string;

### Parameters

- `start` - (required) *Date* - 事件的起始日期  
- `end` - (required) *Date* - 事件的结束日期
- `ev` - (required) *object* - 事件详情

### Returns
- ` text` - (string) - 在 scheduler 中显示的 html 内容

### Example

~~~jsx
scheduler.templates.grid_full_date = function(start,end,event){
    if (scheduler.isOneDayEvent(event))
        return scheduler.templates.grid_single_date(start);
    else
        return scheduler.templates.day_date(start)+" &ndash; "
           +scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 此模板依赖于启用 [grid_view](guides/extensions-list.md#gridview) 插件。 
:::

### Related API
- [GRID_single_date](api/template/gridname_single_date.md)

### Related Guides
- [그리드 뷰 템플릿](views/grid-view-templates.md)
