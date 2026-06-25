---
sidebar_label: "drag_marker_class"
title: "drag_marker_class template"
description: "определяет CSS класс, применяемый к выделенной длительности события на временной шкале"
---

# drag_marker_class

### Description

@short: Определяет CSS класс, применяемый к выделенной длительности события на временной шкале

@signature: drag_marker_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `ev` - (required) *object* - объект события

### Returns
- ` classname` - (string) - css класс, назначенный элементу

### Example

~~~jsx
scheduler.templates.drag_marker_class = function(start, end, event){
    return "";
};
~~~

### Details

Например: 

~~~css
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
