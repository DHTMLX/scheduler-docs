---
sidebar_label: confirm
title: "confirm method"
description: "вызывает окно подтверждения"
---

# confirm

### Description

@short: Вызывает окно подтверждения

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (обязательный) *объект* - конфигурация окна подтверждения

### Returns
- `div` - (HTMLElement) - div-контейнер окна подтверждения

### Example

~~~jsx
const box = scheduler.confirm({
    text: "Continue?",
    ok:"Yes", 
    cancel:"No",
    callback: function(result){
        if(result){
            scheduler.message("Yes!");
        }else{
            scheduler.message("No...");
        }
    }
});
~~~

### Details

Подробнее об поддерживаемых параметрах конфигурации окна подтверждения см. статью [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0