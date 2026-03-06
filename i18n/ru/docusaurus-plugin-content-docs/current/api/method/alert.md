---
sidebar_label: "alert"
title: "alert method"
description: "отображает alert message box"
---

# alert

### Description

@short: Отображает alert message box

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - настройки конфигурации для alert box

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий alert box

### Example

~~~jsx
var box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

Для получения дополнительной информации о доступных параметрах конфигурации alert message box, обратитесь к статье [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0
