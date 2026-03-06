---
sidebar_label: onBeforeExternalDragIn
title: "onBeforeExternalDragIn event"
description: "fires before some element starts to be dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)"
---

# onBeforeExternalDragIn

### Description

@short: Fires before some element starts to be dragged into the scheduler from an outside DHTMLX component (only with dnd extension enabled)

@signature: onBeforeExternalDragIn: (source: HTMLElement, dhtmlx: object, tArea: HTMLElement, tNode: HTMLElement, e: Event) =\> boolean

### Parameters

- `source` - (required) *HTMLElement* - an HTML element that will be dragged into the scheduler
- `dhtmlx` - (required) *object* - a global DHTMLX object
- `tArea` - (required) *HTMLElement* - an HTML object of the scheduler's data area
- `tNode` - (required) *HTMLElement* - the target scheduler's HTML object (a column in the Day view, a section in the Timeline view, etc.)
- `e` - (required) *Event* - a native event object

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeExternalDragIn",function(source,dhtmlx,tArea,tNode,e)
{
    //any custom logic here
    return true;
});
~~~

### Details

:::note
 The event requires the [outerdrag](guides/extensions-list.md#outerdrag) plugin to be activated. 
:::

The event is blockable. Return *false* and the external element won't be dragged to the scheduler.

### Related API
- [onExternalDragIn](api/event/onexternaldragin.md)
