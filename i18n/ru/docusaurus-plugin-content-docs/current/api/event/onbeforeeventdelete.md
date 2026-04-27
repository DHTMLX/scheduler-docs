---
sidebar_label: onBeforeEventDelete
title: "onBeforeEventDelete event"
description: "срабатывает после того, как пользователь нажимает кнопку удаления (в панели событий или окне деталей)"
---

# onBeforeEventDelete

### Description

@short: Срабатывает после нажатия пользователем кнопки удаления (в панели событий или окне деталей)

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события
- `ev` - (required) *object* - объект данных события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Верните *false*, чтобы отменить обработку по умолчанию.