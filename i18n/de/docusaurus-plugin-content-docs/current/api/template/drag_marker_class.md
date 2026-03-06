---
sidebar_label: "drag_marker_class"
title: "drag_marker_class template"
description: "definiert die CSS-Klasse, die auf die hervorgehobene Dauer eines Events in der Zeitskala angewendet wird"
---

# drag_marker_class

### Description

@short: Definiert die CSS-Klasse, die auf die hervorgehobene Dauer eines Events in der Zeitskala angewendet wird

@signature: drag_marker_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem das Event beginnt   
- `end` - (required) *Date* - das Datum, an dem das Event endet
- `ev` - (required) *object* - das Event-Objekt

### Returns
- ` classname` - (string) - die CSS-Klasse, die dem Element zugewiesen wird

### Example

~~~jsx
scheduler.templates.drag_marker_class = function(start, end, event){
    return "";
};
~~~

### Details

Zum Beispiel: 

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
