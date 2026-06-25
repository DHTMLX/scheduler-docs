---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay событие"
description: "срабатывает, когда вызывается метод 'showEvent' для показа конкретного события, и срабатывает ДО его отображения"
---

# onBeforeEventDisplay

### Description

@short: Срабатывает, когда вызывается метод 'showEvent' для отображения конкретного события и выполняется ДО отображения события

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - объект события
- `view` - (required) *string* - имя представления, которое используется для отображения события

### Returns
- `result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    // любая ваша логика здесь
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)