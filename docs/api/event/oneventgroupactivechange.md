---
sidebar_label: onEventGroupActiveChange
title: "onEventGroupActiveChange event"
description: "fires after an event group changes active state"
---

# onEventGroupActiveChange

### Description

@short: Fires after an event group changes active state

@signature: onEventGroupActiveChange: (key: string | number | boolean, active: boolean) => void

### Parameters

- `key` - (required) *string | number | boolean* - the group key that changed
- `active` - (required) *boolean* - the group’s new active state

### Example

~~~js
scheduler.attachEvent("onEventGroupActiveChange", (key, active) => {
    console.log(key, active ? "is visible" : "is hidden");
});
~~~

### Details

The event fires after an event group changes state through
`scheduler.ext.eventGroups.setActive()` or the Sidebar event-group list. The
Scheduler refreshes its event display as part of the change.
