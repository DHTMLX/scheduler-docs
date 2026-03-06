---
sidebar_label: onBeforeEventPasted
title: "onBeforeEventPasted event"
description: "fires before the user presses the 'CTRL+V' keyboard command"
---

# onBeforeEventPasted

### Description

@short: Fires before the user presses the 'CTRL+V' keyboard command

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> boolean

### Parameters

- `isCopy` - (required) *boolean* - indicates whether the event was copied or cut before pasting. The <em>true</em> value 'says' that the event was copied
- `pasted_ev` - (required) *object* - the object of the new data item (the event that is created after pasting)
- `original_ev` - (required) *object* - the object of the original data item (the event that was copied/cut)

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // here you can modify `pastedEvent`
    return true; 
});
~~~

### Details

The 'keyboard navigation' extension should be enabled.

### Related API
- [onEventPasted](api/event/oneventpasted.md)
