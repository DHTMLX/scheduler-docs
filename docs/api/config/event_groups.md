---
sidebar_label: event_groups
title: "event_groups config"
description: "configures event group collections"
---

# event_groups

### Description

@short: Configures event group collections

@signature: event_groups: EventGroupsConfig | false

### Example

~~~js
scheduler.config.event_groups = { list: "calendars", property: "calendarId", default: "work" };
scheduler.serverList("calendars", [
    { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
    { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
~~~

### Details

Event groups are a core feature and do not require a plug-in. A configured object enables them; `false`, `null`, or an absent value disables them on the next render. Defaults are `list: "event_groups"` and `property: "group"`.

### Configuration options

| Option | Type | Description |
| --- | --- | --- |
| `list` | *string* | The name of the collection that stores the group definitions. The default is `"event_groups"`. |
| `property` | *string* | The event property that stores a group key. The default is `"group"`. |
| `default` | *string \| number \| boolean* | The key assigned to a newly created event when it identifies an active group. |

Each collection item uses `key`, `label`, optional `color`, `textColor`, and `active` properties. Inactive groups hide their events. Unknown, empty, array, and other multisection values remain visible without a group color. Do not use a multisection property as `property`.

`default` is assigned to newly created events when it names an active group. Otherwise Scheduler uses the first active group. Event groups do not add a section to the default lightbox; add a `select` section when users need to choose one.

### Related API

- [eventGroups](api/other/eventgroups.md)

### Related Guides

- [Event groups](guides/event-groups.md)
- [Custom Event's Color](guides/custom-events-color.md)
