---
sidebar_label: onMouseMove
title: "Событие onMouseMove"
description: "срабатывает, когда указатель мыши перемещается над планировщиком"
---

# onMouseMove

### Description

@short: Срабатывает при перемещении указателя мыши над планировщиком

@signature: onMouseMove: (id: string, e: Event) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onMouseMove", function (id, e){
    //any custom logic here
});
~~~

### Related samples
- [Handling the pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/06_hightlight_and_single_click_create.html)
- [Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

### Details

Если пользователь перемещает курсор над событием, функция обработчика принимает идентификатор этого события, иначе - null.