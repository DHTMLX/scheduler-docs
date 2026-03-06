---
sidebar_label: onBeforeEventChanged
title: "onBeforeEventChanged event"
description: "fires when the event has been changed by drag-n-drop, but the changes aren't saved yet."
---

# onBeforeEventChanged

### Description

@short: Fires when the event has been changed by drag-n-drop, but the changes aren't saved yet.

@signature: onBeforeEventChanged: (ev: object, e: Event, is_new: boolean, original: object) =\> boolean

### Parameters

- `ev` - (required) *object* - the event's data object after changes
- `e` - (required) *Event* - a native event object
- `is_new` - (required) *boolean* - returns 'true', if the user changes a new event. 'false' - if the edited <br> event already exists
- `original` - (required) *object* - the event's data object before changes

### Returns
- ` result` - (boolean) - defines whether the default action of the event will be triggered (<b>true</b>) or canceled (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
    //any custom logic here
    return true;
});
~~~

### Details

The event occurs when a new "event" is added or an existing one is changed by drag-n-drop action.


- Beware that the 1st parameter of the handler function takes the data item object, not the data item's id (because newly created data items may not have ID yet).
- Unmodified event would be an empty object in case of creating new data items.
- The event is blockable: returning *false* from the handler will prevent data update.
