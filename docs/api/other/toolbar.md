---
sidebar_label: toolbar
title: "toolbar API"
description: "provides runtime access to the Toolbar plug-in"
---

# toolbar

### Description

@short: Provides runtime access to the Toolbar plug-in

@signature: scheduler.ext.toolbar: ToolbarApi

### Example

~~~jsx
scheduler.plugins({ toolbar: true });
scheduler.init("scheduler_here");

scheduler.ext.toolbar.updateItem("today", { hidden: true });
~~~

### Details

This API is available after `scheduler.plugins({ toolbar: true })` and
`scheduler.init()`. It operates on the rendered toolbar without changing
`scheduler.config.header`.

| Method | Description |
| --- | --- |
| `setItems(items)` | Replaces the runtime item structure until the declarative header changes. |
| `updateItem(id, patch, occurrence?)` | Applies a patch to one item. |
| `getItem(id, occurrence?)` | Returns an item configuration copy, or `null`. |
| `getValue(id, occurrence?)` | Returns the current value of a value-bearing item. |
| `setValue(id, value, occurrence?)` | Sets a value without firing a change event. |
| `show(id, occurrence?)` / `hide(id, occurrence?)` | Shows or hides an item. |
| `refresh()` | Re-reads the current header configuration and updates Toolbar state. |
| `getItemNode(id, occurrence?)` | Returns an item root element, or `null`. |
| `getDefaultItems()` | Returns the generated default item list. |

`occurrence` is a zero-based position for a repeated ID in depth-first visual
order; omit it for the first item. Numeric and string forms of the same ID are
treated as one ID.

### Related Guides

- [Toolbar](guides/toolbar.md)
- [header](api/config/header.md)
