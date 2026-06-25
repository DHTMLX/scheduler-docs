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
- `is_new` - (required) *boolean* - returns 'true' if the user changes a new event; 'false' if the edited event already exists
- `original` - (required) *object* - the event's data object before changes

### Returns
- `result` - (boolean) - defines whether the default action of the event will be triggered (`true`) or canceled (`false`)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventChanged", (ev, e, is_new, original) => {
    // any custom logic here
    return true;
});
~~~

### Details

The event occurs when a new event is added or an existing one is changed by drag-and-drop.

- Beware that the first parameter of the handler function takes the data item object, not the data item's id, because newly created data items may not have an ID yet.
- The unmodified event will be an empty object when creating new data items.
- The event is blockable: returning `false` from the handler will prevent the data update.
