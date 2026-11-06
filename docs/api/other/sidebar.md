---
sidebar_label: sidebar
title: "sidebar API"
description: "provides runtime access to the Sidebar plug-in"
---

# sidebar

### Description

@short: Provides runtime access to the Sidebar plug-in

@signature: scheduler.ext.sidebar: SidebarApi

### Example

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.init("scheduler_here");
scheduler.ext.sidebar.toggle();
~~~

### Details

The API is available after `scheduler.plugins({ sidebar: true })`. `show()`, `hide()`, and `toggle()` change the rendered panel. `isCollapsed()` reports the visible state, and `isOverlay()` reports whether the Sidebar is currently an overlay. `refresh()` rereads `scheduler.config.sidebar`; `getItemNode(id)` returns an item node or `null`; `getDefaultItems()` returns the default item IDs.

### Related Guides

- [Sidebar](guides/sidebar.md)
