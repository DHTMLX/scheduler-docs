---
sidebar_label: "message"
title: "message method"
description: "открывает message box выбранного типа"
---

# message

### Description

@short: Открывает message box выбранного типа

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - настройки конфигурации для message box

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий message box

### Example

~~~jsx
var box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

Более подробную информацию о доступных настройках конфигурации для message box можно найти в статье [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)
-

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0
