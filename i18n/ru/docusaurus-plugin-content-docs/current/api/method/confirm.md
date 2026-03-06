---
sidebar_label: "confirm"
title: "confirm method"
description: "открывает confirm message box"
---

# confirm

### Description

@short: Открывает confirm message box

@signature: confirm: (config: any) =\> HTMLElement

### Parameters

- `config` - (required) *object* - настройки для confirm box

### Returns
- ` div` - (HTMLElement) - div элемент, содержащий confirm box

### Example

~~~jsx
var box = scheduler.confirm({
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

Для получения дополнительной информации о доступных параметрах конфигурации confirm message box, ознакомьтесь со статьей [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md).

### Related API
- [alert](api/method/alert.md)
- [message](api/method/message.md)
- [modalbox](api/method/modalbox.md)

### Related Guides
- [Всплывающие сообщения и модальные окна](guides/popups-and-modals.md)

### Change log
- добавлено в версии 6.0
