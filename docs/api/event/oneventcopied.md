---
sidebar_label: onEventCopied
title: "onEventCopied event"
description: "fires when the user presses the 'CTRL+C' keyboard command (only with the 'keyboard navigation' extension enabled)"
---

# onEventCopied

### Description

@short: Fires when the user presses the 'CTRL+C' keyboard command (only with the 'keyboard navigation' extension enabled)

@signature: onEventCopied: (ev: object) =\> void;

### Parameters

- `ev` - (required) *object* - the object of the copied event

### Example

~~~jsx
scheduler.attachEvent("onEventCopied", function(ev) {
    dhtmlx.message("You've copied the event: <br/><b>"+ev.text+"</b>");
    scheduler.updateEvent(ev.id);
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)
- [Recurring events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/01_recurring_events.html)
- [Creating message boxes](https://docs.dhtmlx.com/scheduler/samples/09_api/02_dhtmlx_message.html)

### Details

:::note
 The event requires the [key_nav](guides/extensions-list.md#keyboard-navigation) extension to be enabled. 
:::

### Related Guides
- [onEventCut](api/event/oneventcut.md)
- [onEventPasted](api/event/oneventpasted.md)
