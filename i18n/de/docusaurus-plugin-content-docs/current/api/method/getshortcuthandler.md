---
sidebar_label: "getShortcutHandler"
title: "getShortcutHandler method"
description: "ruft einen Handler für eine Tastaturnavigations-Shortcut ab"
---

# getShortcutHandler

### Description

@short: Ruft einen Handler für eine Tastaturnavigations-Shortcut ab

@signature: getShortcutHandler: (shortcut: string, scope?: string) =\> SchedulerCallback

### Parameters

- `shortcut` - (required) *string* - die Taste oder Tastenkombination, die den Shortcut definiert ([Shortcut-Syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (optional) *string* - (optional) der Name des Kontext-Elements, an das der Handler gebunden wird ([Liste der Scopes](guides/keyboard-navigation.md#scopes))

### Returns
- ` shortcut_handler` - (function) - die Funktion, die die Shortcut-Aktion verarbeitet

### Example

~~~jsx
const shortcut_handler = scheduler.getShortcutHandler("ctrl+a", "event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Eingeführt in Version 5.0

Wenn der Parameter `scope` ausgelassen wird, wird der Handler an den Standard-"scheduler"-Scope gebunden.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [removeShortcut](api/method/removeshortcut.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)
- [focus](api/method/focus.md)

### Related Guides
- [Tastaturnavigation](guides/keyboard-navigation.md)
