---
sidebar_label: eventGroups
title: "eventGroups API"
description: "controls active event groups"
---

# eventGroups

### Description

@short: Controls active event groups

@signature: scheduler.ext.eventGroups: EventGroupsApi

### Example

~~~js
scheduler.ext.eventGroups.setActive("personal", false);
if (scheduler.ext.eventGroups.isActive("work")) {
    scheduler.render();
}
~~~

### Details

`setActive(key, active)` changes a known group's active state and returns `true` when it changes. It fires `onBeforeEventGroupActiveChange` first and does not change the group when that event returns `false`. A successful change repaints Scheduler and fires `onEventGroupActiveChange`. `isActive(key)` returns whether a known group is active.

### Related Guides

- [Event groups](guides/event-groups.md)
