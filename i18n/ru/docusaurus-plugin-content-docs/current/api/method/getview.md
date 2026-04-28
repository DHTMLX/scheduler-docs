---
sidebar_label: getView
title: "Метод getView"
description: "возвращает объект view по имени. Если имя не указано, возвращает текущее представление"
---

# getView

### Description

@short: Возвращает объект view по его имени. Если имя не указано, возвращает текущее представление

@signature: getView: (name?: string) =\> any

### Parameters

- `name` - (optional) *string* - необязательно, имя представления

### Returns
- ` view` - (object) - объект view

### Example

~~~jsx
const timeline = scheduler.getView(); 
timeline.x_size = 8;
scheduler.setCurrentView();
~~~  

### Related samples
- [Display labels in timeline cells](https://docs.dhtmlx.com/scheduler/samples/06_timeline/17_timeline_cell_content.html)

### Details

Возвращает только те виды, которые имеют собственное объектное представление. В настоящее время это виды [timeline](views/timeline.md#timeline-object-api) и [units](views/units.md), поэтому метод вернет *null* для любого другого вида.

### Related Guides
- [Timeline View](views/timeline.md)
- [Units View](views/units.md)