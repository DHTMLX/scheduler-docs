---
sidebar_label: "drag_marker_class"
title: "drag_marker_class template"
description: "定义应用于时间刻度上事件高亮持续时间的CSS类"
---

# drag_marker_class

### Description

@short: 定义应用于时间刻度上事件高亮持续时间的CSS类

@signature: drag_marker_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 事件开始的日期   
- `end` - (required) *Date* - 事件结束的日期
- `ev` - (required) *object* - 事件对象

### Returns
- ` classname` - (string) - 分配给元素的css类名

### Example

~~~jsx
scheduler.templates.drag_marker_class = function(start, end, event){
    return "";
};
~~~

### Details

例如:

~~~html
.myclass{
    background: green;
}
~~~

~~~js
scheduler.templates.drag_marker_class = function(start, end, event){
    return "myclass";
};
~~~

![highlight_scale](/img/highlight_scale.png)

### Related API
- [drag_marker_content](api/template/drag_marker_content.md)
