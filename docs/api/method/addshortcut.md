---
sidebar_label: addShortcut
title: "addShortcut method"
description: "adds a new keyboard shortcut"
---

# addShortcut

### Description

@short: Adds a new keyboard shortcut

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void

### Parameters

- `shortcut	` - (required) *string* - the key name or the name of keys combination for a shortcut (shortcut syntax)
- `handler` - (required) *function* - the handler of the shortcut call
- `scope` - (optional) *string* - the name of the context element to attach the handler function to (list of scopes)

### Example

~~~jsx
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

added in version 4.4

In case the third parameter is not set, the handler will be attached to the scheduler scope.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Keyboard Navigation](guides/keyboard-navigation.md)
