---
sidebar_label: "onError"
title: "onError event"
description: "Срабатывает, когда [assert](api/method/assert.md) получает значение 'false', что означает, что утверждение (assertion) не выполнено."
---

# onError

### Description

@short: Срабатывает, когда [assert](api/method/assert.md) получает значение 'false', что означает, что утверждение (assertion) не выполнено.

@signature: onError: (errorMessage: string) =\> boolean;

### Parameters

- `errorMessage` - (required) *string* - строка, содержащая сообщение об ошибке из метода [assert](api/method/assert.md)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или оно будет остановлено (<b>false</b>)

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

Это событие можно заблокировать. Возврат false остановит поведение по умолчанию, которым является показ сообщения об ошибке в красном боксе в правом верхнем углу.

### Change log
- добавлено в версии 6.0
