---
sidebar_label: "map_date"
title: "map_date template"
description: "设置视图头部显示的日期"
---

# map_date

### Description

@short: 设置视图头部显示的日期

@signature: map_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 视图的开始日期
- `end` - (required) *Date* - 视图的结束日期

### Returns
- ` text` - (string) - 用于在scheduler中渲染的html文本

### Example

~~~jsx
//默认定义
scheduler.templates.map_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Map view](views/map.md)

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

:::note
 该template仅在启用[map_view](guides/extensions-list.md#mapview)插件时有效。 
:::

### Related Guides
- [Map View 템플릿](views/map-view-templates.md)
