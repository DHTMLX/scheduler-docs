---
sidebar_label: "modalbox"
title: "modalbox method"
description: "открывает modalbox"
---

# modalbox

### Description

@short: Открывает modalbox

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - настройки для modalbox

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий modalbox

### Example

~~~jsx
var box = scheduler.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Для получения дополнительной информации о доступных параметрах конфигурации modalbox, смотрите статью [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0
