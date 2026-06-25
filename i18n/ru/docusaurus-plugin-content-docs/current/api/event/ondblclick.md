---
sidebar_label: onDblClick
title: "onDblClick событие"
description: "срабатывает, когда пользователь дважды кликает по событию"
---

# onDblClick

### Description

@short: Срабатывает, когда пользователь дважды кликает по событию

@signature: onDblClick: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - объект нативного события

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (`true`) или отменено (`false`)

### Example

~~~jsx
scheduler.attachEvent("onDblClick", (id, e) => {
    //любая пользовательская логика здесь
    return true;
});
~~~

### Details

Событие можно блокировать. Вернуть `false`, чтобы отменить поведение по умолчанию.