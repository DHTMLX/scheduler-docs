---
sidebar_label: onError
title: "Событие onError"
description: "срабатывает, когда [assert](api/method/assert.md) получает значение 'false', то есть когда утверждение не выполняется"
---

# onError

### Description

@short: срабатывает, когда [assert](api/method/assert.md) получает значение 'false', то есть когда утверждение не выполняется

@signature: onError: (errorMessage: string) => boolean;

### Parameters

- `errorMessage` - (required) *string* - строка с текстом ошибки из метода [assert](api/method/assert.md)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onError", function(errorMessage){
    scheduler.message({
        text:"Error"
    });
    return true;
});
~~~

### Details

Событие можно блокировать. Возврат false предотвратит выполнение поведения по умолчанию (показ сообщения об ошибке в красном окне в правом верхнем углу)

### Change log
- добавлено в версии 6.0