---
sidebar_label: assert
title: "assert метод"
description: "если указанное выражение ложно, errorMessage отображается в красном всплывающем окне в правом верхнем углу экрана"
---

# assert

### Description

@short: Если указанное выражение ложно, errorMessage отображается в красном всплывающем окне в правом верхнем углу экрана

@signature: assert: (expression: boolean, errorMessage: string) =\> void

### Parameters

- `expression` - (required) *boolean* - true для проверки выражения, false - если утверждение не выполняется
- `errorMessage` - (required) *string* - сообщение об ошибке, которое будет отображаться в красном всплывающем окне

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
- добавлено в v6.0