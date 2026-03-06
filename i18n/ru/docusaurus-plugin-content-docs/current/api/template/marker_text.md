---
sidebar_label: "marker_text"
title: "marker_text template"
description: "предоставляет текст, отображаемый в popup-маркере Google Maps для события"
---

# marker_text
:::warning
Эта функицональность устарела
::: 
### Description

@short: Предоставляет текст, отображаемый в popup-маркере Google Maps для события

### Parameters

- `start` - (required) *Date* - дата начала события   
- `end` - (required) *Date* - дата окончания события
- `event` - (required) *object* - детали события

### Returns
- ` text` - (string) - html-содержимое, которое будет показано в scheduler

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
 Этот template работает только если плагин [map_view](guides/extensions-list.md#mapview) включен. 
:::

### Related Guides
- [Шаблоны Map View](views/map-view-templates.md)
