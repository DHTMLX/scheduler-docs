---
sidebar_label: alert
title: "метод alert"
description: "вызывает диалоговое окно alert"
---

# alert

### Description

@short: Вызывает диалоговое окно alert

@signature: alert: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - конфигурация диалогового окна alert

### Returns
- ` div` - (HTMLElement) - div-контейнер диалогового окна alert

### Example

~~~jsx
const box = scheduler.alert({
    title:"Alert",
    type:"alert-error",
    text:"You can't do this"
});
~~~

### Details

Для получения сведений о поддерживаемых опциях конфигурации диалогового окна оповещения смотрите статью [Popup Messages and Modal Boxes](guides/popups-and-modals.md).

### Related API
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0