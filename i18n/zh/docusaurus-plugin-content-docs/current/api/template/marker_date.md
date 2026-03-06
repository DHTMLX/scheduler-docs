---
sidebar_label: "marker_date"
title: "marker_date template"
description: "设置 Google Maps 弹出 marker 中显示的事件日期"
---

# marker_date
:::warning 
此功能已棄用。
:::
### Description

@short: 设置 Google Maps 弹出 marker 中显示的事件日期

### Parameters

- `start` - (required) *Date* - 事件的开始日期   
- `end` - (required) *Date* - 事件的结束日期
- `event` - (required) *object* - 事件对象本身

### Returns
- ` text` - (string) - 在 scheduler 中显示的 html 内容

### Example

~~~jsx
scheduler.templates.marker_date = function(date){
    return scheduler.date.date_to_str("%Y-%m-%d %H:%i"); 
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 此模板仅在启用 [map_view](guides/extensions-list.md#mapview) 插件时有效。 
:::

### Related Guides
- [Map View 템플릿](views/map-view-templates.md)
