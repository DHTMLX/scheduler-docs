---
sidebar_label: onContextMenu
title: "onContextMenu событие"
description: "Срабатывает, когда пользователь вызывает контекстное меню кликом правой кнопкой мыши внутри планировщика"
---

# onContextMenu

### Description

@short: Срабатывает, когда пользователь вызывает контекстное меню кликом правой кнопкой мыши внутри планировщика

@signature: onContextMenu: (id: string, e: Event) =\> void;

### Parameters

- `id` - (обязательный) *string* - идентификатор события
- `e` - (обязательный) *Event* - нативный объект события

### Example

~~~jsx
scheduler.attachEvent("onContextMenu", function (id, e){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Интеграция с dhtmlxMenu](https://docs.dhtmlx.com/scheduler/samples/10_integration/01_dhtmlxmenu.html)

### Details

Если пользователь кликнет по событию, обработчик получит id события, в противном случае — null.