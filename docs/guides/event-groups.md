---
sidebar_label: Event groups
title: Event groups
description: Colour and show or hide Scheduler events by a named collection
---

# Event groups

Event groups are available in Scheduler core in both GPL and PRO editions. An event has one group key in a configurable property. Groups can represent calendars, event types, projects, or teams; no sidebar or plugin is required.

```js
scheduler.config.event_groups = { list: "event_groups", property: "group", default: "work" };
scheduler.serverList("event_groups", [
  { key: "work", label: "Work", color: "#537cfa", textColor: "#fff" },
  { key: "personal", label: "Personal", color: "#39a675", active: false }
]);
scheduler.init("scheduler_here", new Date(), "week");
scheduler.parse([{ id: 1, start_date: "2026-10-19 09:00", end_date: "2026-10-19 10:00", group: "work" }]);
```

Setting `event_groups` to `{}` uses the collection `event_groups` and event property `group`. A non-array object enables the feature; `undefined`, `null`, `false`, or removing the config key disables it on the next render. Config changes after `init()` take effect on the next `scheduler.render()`. React, Vue, and Angular wrappers apply additions, changes, and removal through their `config` prop or input. One `event_groups` configuration, collection name, and event property can be active per Scheduler instance.

Group items have `key`, `label`, optional `color`, `textColor`, and `active` fields. In JSON collections, `value` is accepted as an alias and is mapped to `key`. Other fields remain available to application code. In particular, `readonly` currently has no built-in effect: this release does not provide group add, edit, or delete controls. A group is hidden only when `active === false`. An event in a hidden group remains loaded but is absent from views and mini-calendar event marks. Hiding a group does not remove a units column or timeline row. User view filters and wrapper filters continue to apply alongside group visibility.

Keys may be nonempty strings, finite numbers, or booleans. Matching follows the lightbox select control's string values: `1` and `"1"` identify the same group. The first item with a matching key wins. Invalid items and later duplicates are ignored. Event values of `undefined`, `null`, `""`, unknown keys, arrays, and other multisection values are ungrouped: they remain visible and receive no group colour. Do not use a multisection property as the group property.

The two colour channels resolve independently: an event's `color` or `textColor` wins, followed by an event-node CSS rule such as `event_class`, then the corresponding group colour, then the theme. Empty or null group colours fall back to CSS or the theme.

New events created through Scheduler's UI or `addEventNow()` receive the configured `default` group if it is active, otherwise the first active group. If no group is active, the property remains empty and the event shows. Scheduler fills only `undefined`, `null`, or `""`; values supplied to `addEventNow()` and changes made in `onEventCreated` are preserved. Application code may deliberately assign a hidden group, which hides that event. Loaded events and ordinary imports keep their supplied values.

Use `scheduler.ext.eventGroups.setActive(key, active)` to toggle a group and `isActive(key)` to read it. `setActive` fires cancellable `onBeforeEventGroupActiveChange(key, active)` and, after a successful change, `onEventGroupActiveChange(key, active)`. Replace groups with `scheduler.updateCollection("event_groups", items)` or JSON `collections`; these paths also honour active-change vetoes for keys present in both lists. Direct item edits become visible on the next explicit render but do not repaint automatically.

To let users change an event's group in the lightbox, add a select section and its label:

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", options: scheduler.serverList("event_groups"), map_to: "group" },
  { name: "time", type: "time", map_to: "auto" }
];
```

Event groups do not change the default lightbox or add group editing controls.

[Sidebar and event-group list sample](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
