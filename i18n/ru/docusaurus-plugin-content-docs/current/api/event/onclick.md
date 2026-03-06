---
sidebar_label: "onClick"
title: "onClick event"
description: "срабатывает, когда пользователь кликает левой кнопкой мыши по событию"
---

# onClick

### Description

@short: Срабатывает, когда пользователь кликает левой кнопкой мыши по событию

@signature: onClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие события (<b>true</b>) или заблокировано (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onClick", function (id, e){
       //любая кастомная логика здесь
       return true;
  });
~~~

### Related samples
- [Hiding the select bar of the event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/10_without_toolbar.html)
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)

### Details

Это событие можно блокировать. Возврат любого значения, отличного от true, из обработчика предотвратит стандартное поведение (которое обычно показывает selection bar).

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md#openingthelightboxonasingleclick)
