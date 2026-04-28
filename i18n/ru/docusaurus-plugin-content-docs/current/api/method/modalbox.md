---
sidebar_label: modalbox
title: "метод modalbox"
description: "вызов modalbox"
---

# modalbox

### Description

@short: Вызывает modalbox

@signature: modalbox: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - конфигурация модального окна

### Returns
- ` div` - (HTMLElement) - div-контейнер modalbox

### Example

~~~jsx
const box = scheduler.modalbox({
    title: "Close",
     type: "alert-warning"
});
~~~

### Details

Для получения подробной информации о поддерживаемых опциях конфигурации modalbox, смотрите статью [Popup Messages and Modal Boxes](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [message](api/method/message.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0