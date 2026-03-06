---
sidebar_label: "onDblClick"
title: "onDblClick event"
description: "срабатывает, когда пользователь делает двойной клик по событию"
---

# onDblClick

### Description

@short: Срабатывает, когда пользователь делает двойной клик по событию

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - объект нативного события

### Returns
- ` result` - (boolean) - указывает, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет предотвращено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", function (id, e){
    //любая пользовательская логика здесь
    return true;
})
~~~

### Details

Это событие можно блокировать. Возврат *false* остановит выполнение действия по умолчанию.
