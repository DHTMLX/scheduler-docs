---
sidebar_label: "addShortcut"
title: "addShortcut method"
description: "создаёт новую клавиатурную комбинацию (shortcut)"
---

# addShortcut

### Description

@short: Создаёт новую клавиатурную комбинацию (shortcut)

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void
### Parameters

- `shortcut	` - (required) *string* - клавиша или комбинация клавиш, определяющая shortcut (синтаксис shortcut)
- `handler` - (required) *function* - функция, которая будет вызвана при срабатывании shortcut
- `scope` - (optional) *string* - (опционально) указывает контекстный элемент, к которому прикреплен handler (список scope)

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

добавлено в версии 4.4

Если третий параметр опущен, handler по умолчанию прикрепляется к scope scheduler.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Навигация с помощью клавиатуры](guides/keyboard-navigation.md)
