---
sidebar_label: onEventLoading
title: "onEventLoading событие"
description: "вызывает событие, когда событие загружается из источника данных"
---

# onEventLoading

### Description

@short: Срабатывает, когда событие загружается из источника данных

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - объект события (объект элемента данных)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

- Событие можно заблокировать. Вернуть *false*  — и элемент данных не будет загружен в scheduler.
- Событие вызывается для каждого элемента данных в источнике данных.