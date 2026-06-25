---
sidebar_label: addShortcut
title: "метод addShortcut"
description: "добавляет новую комбинацию клавиш"
---

# addShortcut

### Description

@short: Добавляет новую комбинацию клавиш

@signature: addShortcut: (shortcut: string, handler: SchedulerCallback, scope?: string) =\> void

### Parameters

- `shortcut` - (required) *string* - имя клавиши или имя комбинации клавиш для ярлыка (синтаксис ярлыка)
- `handler` - (required) *function* - обработчик вызова ярлыка
- `scope` - (optional) *string* - имя контекстного элемента, к которому привязывается функция-обработчик (список областей)

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

Добавлено в версии 4.4

Если третий параметр не задан, обработчик будет привязан к области планировщика.

### Related API
- [getShortcutHandler](api/method/getshortcuthandler.md)
- [removeShortcut](api/method/removeshortcut.md)
- [focus](api/method/focus.md)
- [key_nav](api/config/key_nav.md)
- [key_nav_step](api/config/key_nav_step.md)

### Related Guides
- [Навигация по клавиатуре](guides/keyboard-navigation.md)