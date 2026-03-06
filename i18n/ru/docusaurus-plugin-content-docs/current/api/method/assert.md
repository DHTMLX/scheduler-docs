---
sidebar_label: "assert"
title: "assert method"
description: "если заданное выражение ложно, в красном всплывающем окне в правом верхнем углу экрана появится сообщение об ошибке"
---

# assert

### Description

@short: Если заданное выражение ложно, в красном всплывающем окне в правом верхнем углу экрана появится сообщение об ошибке

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - true для подтверждения выражения, false - если assert не прошёл
- `errorMessage` - (required) *string* - сообщение об ошибке, которое будет показано в красном popup

### Example

~~~jsx
scheduler.attachEvent("onLoadEnd", function(){
   scheduler.assert(scheduler.getTaskCount(), "no data loaded");
});
~~~

### Details

В кодовой базе dhtmlxScheduler **scheduler.assert()** используется для определения, когда компонент находится в некорректном состоянии.

Вы можете настроить отображение ошибок с помощью конфигурации [show_errors](api/config/show_errors.md).

Ошибки также можно отслеживать программно через событие [onError](api/event/onerror.md).

### Change log
- добавлено в версии v6.0
