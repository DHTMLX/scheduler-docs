---
sidebar_label: onToolbarItemRender
title: "onToolbarItemRender event"
description: "fires when a Toolbar container item is mounted"
---

# onToolbarItemRender

### Description

@short: Fires when a Toolbar container item is mounted

@signature: onToolbarItemRender: (id: string | number, node: HTMLElement) =\> void

### Parameters

- `id` - (required) *string | number* - the container item ID
- `node` - (required) *HTMLElement* - the empty container element

### Example

~~~jsx
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "search" || node.firstChild) return;
    const input = document.createElement("input");
    input.type = "search";
    input.placeholder = "Search";
    node.appendChild(input);
});
~~~

### Details

Requires the [Toolbar](guides/toolbar.md) plugin. The event fires for
each `{ id, comp: "container" }` occurrence after it is inserted into the
Toolbar. Populate the supplied node rather than replacing it; the node is kept
when the header configuration is unchanged.

### Related Guides

- [Toolbar](guides/toolbar.md)
