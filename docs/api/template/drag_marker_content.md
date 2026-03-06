---
sidebar_label: drag_marker_content
title: "drag_marker_content template"
description: "specifies the content of the highlighted block on the time scale"
---

# drag_marker_content

### Description

@short: Specifies the content of the highlighted block on the time scale

@signature: drag_marker_content: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin   
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `ev` - (required) *object* - the event's object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.drag_marker_content = function(start, end, event){
    return "";
};
~~~

### Details

For example: 


~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
    return "<b>my text</b>";
};
~~~

![scale_content](/img/scale_content.png)

### Related API
- [drag_marker_class](api/template/drag_marker_class.md)
