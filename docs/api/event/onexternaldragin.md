---
sidebar_label: onExternalDragIn
title: "onExternalDragIn event"
description: "fires when some data is being dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)"
---

# onExternalDragIn

### Description

@short: Fires when some data is being dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)

@signature: onExternalDragIn: (id: string, source: object, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the data item id
- `source` - (required) *object* - the source HTML element that was dragged into the scheduler
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onExternalDragIn", function (id, source, e){
    scheduler.getEvent(id).text = source.innerHTML;
    return true;
});
~~~

### Related samples
- [Integration with dhtmlxTree](https://docs.dhtmlx.com/scheduler/samples/10_integration/02_dhtmlxtree_outer_drag.html)

### Details

:::note
 The event requires the [outerdrag](guides/extensions-list.md#outerdrag) plugin to be activated. 
:::

- The event can be used to customize newly-created events (which are the result of drag-in operations).
- The event is blockable. Return *false*,  and dragging won't produce a new event.

### Related API
- [onBeforeExternalDragIn](api/event/onbeforeexternaldragin.md)
