---
sidebar_label: onBeforeEventGroupActiveChange
title: "onBeforeEventGroupActiveChange event"
description: "fires before an event group changes active state"
---

# onBeforeEventGroupActiveChange

### Description

@short: Fires before an event group changes active state

@signature: onBeforeEventGroupActiveChange: (key: string | number | boolean, active: boolean) => boolean

### Parameters

- `key` - (required) *string | number | boolean* - the group key whose state is changing
- `active` - (required) *boolean* - the requested active state

### Returns

- `result` - (boolean) - return `false` to cancel the change

### Example

~~~js
scheduler.attachEvent("onBeforeEventGroupActiveChange", (key, active) => {
    return key !== "personal" || active;
});
~~~

### Details

The event fires before `scheduler.ext.eventGroups.setActive()` changes a group,
and before the event-group list applies a checkbox change. Returning `false`
keeps the current state and prevents `onEventGroupActiveChange` from firing.
