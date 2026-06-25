---
sidebar_label: сообщение
title: "метод message"
description: "вызывает диалоговое окно сообщения указанного типа"
---

# message

### Description

@short: Вызывает диалоговое окно сообщения указанного типа

@signature: message: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - конфигурация окна сообщения

### Returns
- ` div` - (HTMLElement) - контейнер div окна сообщения

### Example

~~~jsx
const box = scheduler.message({ 
    type:"confirm-warning", 
    text:"Are you sure you want to do it?"
});
~~~

### Details

Для получения подробной информации об поддерживаемых параметрах конфигурации диалогового окна сообщения смотрите статью [Popup Messages and Modal Boxes](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [confirm](api/method/confirm.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Popup Messages and Modal Boxes](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0