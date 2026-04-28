---
sidebar_label: "removeShortcut"
title: "removeShortcut method"
description: "entfernt eine Tastenkombination (keyboard shortcut)"
---

# removeShortcut

### Description

@short: Entfernt eine Tastenkombination (keyboard shortcut)

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (required) *string* - der Name der Taste oder der Tastenkombination für einen Shortcut ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *object* - (optional) das Element, an das der Shortcut gebunden ist ([Liste der Scopes](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// Hinzufügen eines Shortcuts
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// Entfernen eines Shortcuts
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Hinzugefügt in Version 4.4

Wenn der Parameter `scope` weggelassen wird, wird der Shortcut aus dem Standard-"scheduler" Scope entfernt.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
