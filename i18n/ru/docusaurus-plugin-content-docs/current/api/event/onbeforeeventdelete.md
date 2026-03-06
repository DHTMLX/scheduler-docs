---
sidebar_label: "onBeforeEventDelete"
title: "onBeforeEventDelete event"
description: "срабатывает сразу после того, как пользователь нажимает кнопку удаления (либо в event bar, либо в окне деталей)"
---

# onBeforeEventDelete

### Description

@short: Срабатывает сразу после того, как пользователь нажимает кнопку удаления (либо в event bar, либо в окне деталей)

@signature: onBeforeEventDelete: (id: string, ev: object) =\> boolean

### Parameters

- `id` - (required) *string* - id события
- `ev` - (required) *object* - объект с данными события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие удаления (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDelete", function(id,ev){
    //место для вашей кастомной логики
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* остановит стандартный процесс удаления.
