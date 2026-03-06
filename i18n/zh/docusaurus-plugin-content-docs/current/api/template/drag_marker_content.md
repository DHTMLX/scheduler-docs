---
sidebar_label: "drag_marker_content"
title: "drag_marker_content template"
description: "定义时间刻度上高亮块中显示的内容"
---

# drag_marker_content

### Description

@short: 定义时间刻度上高亮块中显示的内容

@signature: drag_marker_content: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期
- `end` - (required) *Date* - 事件预计结束的日期
- `ev` - (required) *object* - 事件对象

### Returns
- ` text` - (string) - 在scheduler中显示的HTML内容

### Example

~~~jsx
scheduler.templates.drag_marker_content = function(start, end, event){
    return "";
};
~~~

### Details

例如:

~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
    return "<b>my text</b>";
};
~~~

![scale_content](/img/scale_content.png)

### Related API
- [drag_marker_class](api/template/drag_marker_class.md)
