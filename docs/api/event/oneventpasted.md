---
sidebar_label: onEventPasted
title: "onEventPasted event"
description: "fires when the user presses the 'CTRL+V' keyboard command"
---

# onEventPasted

### Description

@short: Fires when the user presses the 'CTRL+V' keyboard command

@signature: onEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> void;

### Parameters

- `isCopy` - (required) *boolean* - indicates whether the event was copied or cut before pasting. The <em>true</em> value 'says' that the event was copied
- `pasted_ev` - (required) *object* - the object of the new data item (the event that is created after pasting)
- `original_ev` - (required) *object* - the object of the original data item (the event that was copied/cut)

### Example

~~~jsx
scheduler.attachEvent("onEventPasted", function(isCopy, pasted_ev, original_ev) {
    //any custom logic here
});
~~~

### Related samples
- [Keyboard navigation in the scheduler](https://docs.dhtmlx.com/scheduler/samples/03_extensions/07_navigation_plugin.html)

### Details

:::note
 The event requires the [key_nav](guides/extensions-list.md#keyboard-navigation) extension to be enabled. 
:::

### Related Guides
- [onEventCopied](api/event/oneventcopied.md)
- [onEventCut](api/event/oneventcut.md)
