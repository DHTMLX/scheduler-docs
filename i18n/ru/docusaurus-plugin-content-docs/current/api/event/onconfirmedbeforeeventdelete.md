---
sidebar_label: onConfirmedBeforeEventDelete
title: "onConfirmedBeforeEventDelete event"
description: "срабатывает после того, как пользователь нажимает кнопку удаления и подтверждает удаление (на панели события или в окне деталей)"
---

# onConfirmedBeforeEventDelete

### Description

@short: Срабатывает после того, как пользователь нажимает кнопку удаления и подтверждает удаление (на панели события или в окне деталей)

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию у события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Это событие можно заблокировать. Вернуть *false*, чтобы отменить обработку по умолчанию.