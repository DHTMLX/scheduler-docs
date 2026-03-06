---
sidebar_label: drag_marker_class
title: "drag_marker_class template"
description: "specifies the CSS class that will be applied to the highlighted event's duration on the time scale"
---

# drag_marker_class

### Description

@short: Specifies the CSS class that will be applied to the highlighted event's duration on the time scale

@signature: drag_marker_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `ev` - (required) *object* - the event's object

### Returns
- ` classname` - (string) - css class for related element

### Example

~~~jsx
scheduler.templates.drag_marker_class = function(start, end, event){
    return "";
};
~~~

### Details

For example: 

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
