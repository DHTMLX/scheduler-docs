---
sidebar_label: "drag_marker_content"
title: "drag_marker_content template"
description: "definiert den Inhalt, der im hervorgehobenen Block auf der Zeitskala angezeigt wird"
---

# drag_marker_content

### Description

@short: Definiert den Inhalt, der im hervorgehobenen Block auf der Zeitskala angezeigt wird

@signature: drag_marker_content: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - das Datum, an dem das Ereignis beginnen soll  
- `end` - (required) *Date* - das Datum, an dem das Ereignis voraussichtlich endet
- `ev` - (required) *object* - das Ereignisobjekt

### Returns
- ` text` - (string) - HTML-Inhalt, der im Scheduler angezeigt wird

### Example

~~~jsx
scheduler.templates.drag_marker_content = function(start, end, event){
    return "";
};
~~~

### Details

Zum Beispiel:

~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
    return "<b>my text</b>";
};
~~~

![scale_content](/img/scale_content.png)

### Related API
- [drag_marker_class](api/template/drag_marker_class.md)
