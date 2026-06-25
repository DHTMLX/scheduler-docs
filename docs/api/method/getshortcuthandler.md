---
sidebar_label: getShortcutHandler
title: "getShortcutHandler method"
description: "gets a key navigation shortcut handler"
---

# getShortcutHandler

### Description

@short: Gets a key navigation shortcut handler

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - the key name or the name of keys combination for a shortcut ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *string* - (optional) the name of the context element to attach the handler function to ([list of scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - the handler of the shortcut call

### Example

~~~jsx
const shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Added in version 5.0

If the `scope` parameter is not provided the "scheduler" scope will be used by default.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
