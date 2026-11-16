---
sidebar_label: onToolbarItemClick
title: "onToolbarItemClick event"
description: "fires when a Toolbar item is activated"
---

# onToolbarItemClick

### Description

@short: Fires when a Toolbar item is activated

@signature: onToolbarItemClick: (id: string | number, item: object, event: Event | null) =\> boolean

### Parameters

- `id` - (required) *string | number* - the item ID
- `item` - (required) *object* - a copy of the item configuration; its `occurrence` property identifies a repeated ID
- `event` - (required) *Event | null* - the native click event, or `null` for a keyboard/touch activation

### Returns

- `result` - (boolean) - return `false` to cancel the built-in action or view switch

### Example

~~~jsx
scheduler.attachEvent("onToolbarItemClick", (id, item, event) => {
    if (id === "add_event" && scheduler.config.readonly) return false;
    return true;
});
~~~

### Details

Requires the [Toolbar](guides/toolbar.md) plugin. The event fires after a
legacy item `click` callback and before the Toolbar built-in or view action.
Returning `false` does not undo the legacy callback, but prevents the following
Scheduler action. View tabs and a `views` menu report the selected view name as
`id`.

### Related Guides

- [Toolbar](guides/toolbar.md)
