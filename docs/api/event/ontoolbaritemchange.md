---
sidebar_label: onToolbarItemChange
title: "onToolbarItemChange event"
description: "fires when a Toolbar value item changes"
---

# onToolbarItemChange

### Description

@short: Fires when a Toolbar value item changes

@signature: onToolbarItemChange: (id: string | number, value: any, item: object) =\> boolean

### Parameters

- `id` - (required) *string | number* - the item ID
- `value` - (required) *any* - the newly selected value
- `item` - (required) *object* - a copy of the item configuration; its `occurrence` property identifies a repeated ID

### Returns

- `result` - (boolean) - return `false` to restore the previous value and cancel the action

### Example

~~~jsx
scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "views" && value === "month" && !canOpenMonth()) return false;
    return true;
});
~~~

### Details

Requires the [Toolbar](guides/toolbar.md) plugin. This event is used by
value controls such as `combo`, `segmented`, and a segmented `views` item. If
it returns `false`, the shared Toolbar restores the last accepted value.

### Related Guides

- [Toolbar](guides/toolbar.md)
