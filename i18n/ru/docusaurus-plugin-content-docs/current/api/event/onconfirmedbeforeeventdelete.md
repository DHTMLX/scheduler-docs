---
sidebar_label: "onConfirmedBeforeEventDelete"
title: "onConfirmedBeforeEventDelete event"
description: "срабатывает сразу после того, как пользователь нажимает кнопку удаления и подтверждает удаление (либо в панели события, либо в окне деталей)"
---

# onConfirmedBeforeEventDelete

### Description

@short: Срабатывает сразу после того, как пользователь нажимает кнопку удаления и подтверждает удаление (либо в панели события, либо в окне деталей)

@signature: onConfirmedBeforeEventDelete: (id: string, e: Event) =\> boolean;

### Parameters

- `id` - (required) *string* - идентификатор события
- `e` - (required) *Event* - нативный объект события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onConfirmedBeforeEventDelete", function(id,e){
    // здесь можно разместить пользовательскую логику
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит выполнение действия по умолчанию.
