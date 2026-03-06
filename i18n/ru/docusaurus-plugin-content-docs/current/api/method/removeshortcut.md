---
sidebar_label: "removeShortcut"
title: "removeShortcut method"
description: "удаляет клавиатурный shortcut"
---

# removeShortcut

### Description

@short: Удаляет клавиатурный shortcut

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (required) *string* - название клавиши или комбинации клавиш для shortcut ([синтаксис shortcut](guides/keyboard-navigation.md#shortcutsyntax))
- `scope` - (optional) *object* - (необязательно) элемент, к которому привязан shortcut ([список scope](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// добавление shortcut
scheduler.addShortcut("shift+w", function(e){ 
    var eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// удаление shortcut
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Keyboard Navigation and WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Добавлено в версии 4.4

Если параметр `scope` опущен, shortcut будет удалён из дефолтного scope "scheduler".

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Навигация с помощью клавиатуры](guides/keyboard-navigation.md)
