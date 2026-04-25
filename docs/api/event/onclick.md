---
sidebar_label: onClick
title: "onClick event"
description: "fires when the user clicks the left mouse button on an event"
---

# onClick

### Description

@short: Fires when the user clicks the left mouse button on an event

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - the event's id
- `e` - (required) *Event* - a native event object

### Returns
- `result` - (boolean) - defines whether the default action of the event will be triggered (`true`) or canceled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onClick", (id, event) => {
    // any custom logic here
    return true;
});
~~~

### Related samples
- [Hiding the select bar of the event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

The event is blockable. If a non-`true` value is returned from the handler, the default reaction will be blocked. By default, the selection bar appears.

### Related Guides
- [Manipulations with Lightbox](guides/lightbox-editors-manipulations.md#opening-the-lightbox-on-a-single-click)
