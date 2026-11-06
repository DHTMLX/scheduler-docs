---
sidebar_label: onSidebarItemRender
title: "onSidebarItemRender event"
description: "fires when a custom Sidebar item is mounted"
---

# onSidebarItemRender

### Description

@short: Fires when a custom Sidebar item is mounted

@signature: onSidebarItemRender: (id: string, node: HTMLElement) => void

### Parameters

- `id` - (required) *string* - the custom item ID
- `node` - (required) *HTMLElement* - the empty item container

### Example

~~~js
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
    if (id === "summary") node.textContent = "Upcoming events";
});
~~~

### Details

The event fires for custom `{ id }` Sidebar items. Built-in `minicalendar` and `event_groups` items manage their own content.
