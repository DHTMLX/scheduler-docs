---
sidebar_label: onEventCut
title: "onEventCut event"
description: "fires when the user presses the 'CTRL+X' keyboard command (only with the 'keyboard navigation' extension enabled)"
---

# onEventCut

### Description

@short: Fires when the user presses the 'CTRL+X' keyboard command (only with the 'keyboard navigation' extension enabled)

@signature: onEventCut: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - the event's object

### Example

~~~jsx
scheduler.attachEvent("onEventCut", function(ev) {
    dhtmlx.message("You've cut the event: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)

### Details

:::note
 The event requires the [key_nav](guides/extensions-list.md#keyboard-navigation) extension to be enabled. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventPasted](api/event/oneventpasted.md)
