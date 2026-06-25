---
sidebar_label: removeShortcut
title: "removeShortcut method"
description: "removes a keyboard shortcut"
---

# removeShortcut

### Description

@short: Removes a keyboard shortcut

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (required) *string* - the key name or the name of keys combination for a shortcut ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *object* - (optional) the element to which the shortcut is attached ([list of scopes](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// adding a shortcut
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// removing a shortcut
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Added in version 4.4

If the `scope` parameter is not provided the "scheduler" scope will be used by default.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
