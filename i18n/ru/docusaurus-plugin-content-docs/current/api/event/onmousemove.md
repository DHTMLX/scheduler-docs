---
sidebar_label: "onMouseMove"
title: "onMouseMove event"
description: "срабатывает при перемещении курсора мыши над scheduler"
---

# onMouseMove

### Description

@short: Срабатывает при перемещении курсора мыши над scheduler

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - объект нативного события

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //любая ваша логика здесь
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- 10_integration/02_dhtmlxTree_outer_drag.html

### Details

Когда курсор перемещается над событием, обработчик получает id этого события; если курсор не над событием, передается null.
