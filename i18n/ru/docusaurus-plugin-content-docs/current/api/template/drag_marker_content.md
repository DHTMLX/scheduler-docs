---
sidebar_label: "drag_marker_content"
title: "drag_marker_content template"
description: "определяет содержимое, отображаемое в выделенном блоке на временной шкале"
---

# drag_marker_content

### Description

@short: Определяет содержимое, отображаемое в выделенном блоке на временной шкале

@signature: drag_marker_content: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата предполагаемого окончания события
- `ev` - (required) *object* - объект события

### Returns
- ` text` - (string) - HTML-содержимое, которое будет отображено в scheduler

### Example

~~~jsx
scheduler.templates.drag_marker_content = function(start, end, event){
    return "";
};
~~~

### Details

Например: 


~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
    return "<b>my text</b>";
};
~~~

![scale_content](/img/scale_content.png)

### Related API
- [drag_marker_class](api/template/drag_marker_class.md)
