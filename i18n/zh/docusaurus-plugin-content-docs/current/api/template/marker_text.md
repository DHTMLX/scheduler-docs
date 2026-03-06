---
sidebar_label: "marker_text"
title: "marker_text template"
description: "提供在 Google Maps 弹出标记中显示的事件文本"
---

# marker_text
:::warning 
此功能已棄用。
:::
### Description

@short: 提供在 Google Maps 弹出标记中显示的事件文本

### Parameters

- `start` - (required) *Date* - 事件开始的日期   
- `end` - (required) *Date* - 事件结束的日期
- `event` - (required) *object* - 事件详情

### Returns
- ` text` - (string) - 计划器中显示的 html 内容

### Example

~~~jsx
scheduler.templates.marker_text = function(start,end,ev){
     return "<div><b>" + ev.text + "</b><br/><br/>" + (ev.event_location || '') + 
     "<br/><br/>" + scheduler.templates.marker_date(start) + " - " + 
     scheduler.templates.marker_date(end) + "</div>";
};
~~~

**Applicable views:** [Map view](views/map.md)

### Details

:::note
 该模板仅在启用 [map_view](guides/extensions-list.md#mapview) 插件时有效。 
:::

### Related Guides
- [Map View 템플릿](views/map-view-templates.md)
