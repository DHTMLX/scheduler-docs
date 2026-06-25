---
sidebar_label: removeShortcut
title: "метод removeShortcut"
description: "удаляет сочетание клавиш"
---

# removeShortcut

### Description

@short: Удаляет сочетание клавиш

@signature: removeShortcut: (shortcut: string, scope?: any) =\> void

### Parameters

- `shortcut` - (обязательное) *string* - имя клавиши или имя комбинации клавиш, образующих сочетание клавиш ([shortcut syntax](guides/keyboard-navigation.md#shortcut-syntax))
- `scope` - (необязательно) *object* - элемент, к которому привязано сочетание клавиш ([список контекстов](guides/keyboard-navigation.md#scopes))

### Example

~~~jsx
// добавление сочетания клавиш
scheduler.addShortcut("shift+w", function(e){ 
    const eventId = scheduler.locate(e); 
    if(eventId) 
        scheduler.showQuickInfo(eventId);
},"event");

// удаление сочетания клавиш
scheduler.removeShortcut("shift+w","event");
~~~

### Related samples
- [Навигация по клавиатуре и WAI-ARIA - Flat Skin](https://docs.dhtmlx.com/scheduler/samples/13_accessibility/01_regular_skin_all_views.html)

### Details

Добавлено в версии 4.4

Если параметр `scope` не указан, будет использоваться область `scheduler` по умолчанию.

### Related API
- [addShortcut](api/method/addshortcut.md)
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Навигация по клавиатуре](guides/keyboard-navigation.md)