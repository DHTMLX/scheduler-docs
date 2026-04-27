---
sidebar_label: "addShortcut"
title: "addShortcut method"
description: "erstellt eine neue Tastenkombination (Shortcut)"
---

# addShortcut

### Description

@short: Erstellt eine neue Tastenkombination (Shortcut)

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void

### Parameters

- `shortcut	` - (required) *string* - die Taste oder Tastenkombination, die den Shortcut definiert (Shortcut-Syntax)
- `handler` - (required) *function* - die Funktion, die aufgerufen wird, wenn der Shortcut ausgelöst wird
- `scope` - (optional) *string* - gibt das Kontext-Element an, an das der Handler gebunden wird (Liste der Scopes)

### Example

~~~jsx
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

hinzugefügt in Version 4.4

Wenn der dritte Parameter weggelassen wird, wird der Handler standardmäßig an den Scheduler-Scope gebunden.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
