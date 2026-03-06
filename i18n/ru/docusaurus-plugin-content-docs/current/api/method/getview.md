---
sidebar_label: "getView"
title: "getView method"
description: "возвращает объект view по его имени. Если имя не указано, возвращается текущий view"
---

# getView

### Description

@short: Возвращает объект view по его имени. Если имя не указано, возвращается текущий view

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - необязательный, имя view

### Returns
- ` view` - (object) - объект view

### Example

~~~jsx
var timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

Этот метод возвращает только те views, которые имеют собственное объектное представление. В настоящий момент это [timeline](views/timeline.md#timelineobjectapi) и [units](views/units.md) views, поэтому для любого другого view метод вернёт *null*.

### Related Guides
- [Вид 'Timeline'](views/timeline.md)
- [Units View](views/units.md)
