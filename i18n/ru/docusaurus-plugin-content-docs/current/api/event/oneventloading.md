---
sidebar_label: "onEventLoading"
title: "onEventLoading event"
description: "срабатывает при загрузке события из источника данных"
---

# onEventLoading

### Description

@short: Срабатывает при загрузке события из источника данных

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - объект события (представляет элемент данных)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    // здесь можно добавить пользовательскую логику
    return true;
});
~~~

### Details

- Это событие можно заблокировать. Возврат *false* предотвращает загрузку элемента данных в scheduler.
- Срабатывает для каждого элемента данных в источнике.
