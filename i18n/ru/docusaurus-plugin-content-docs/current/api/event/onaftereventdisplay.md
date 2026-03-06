---
sidebar_label: "onAfterEventDisplay"
title: "onAfterEventDisplay event"
description: "срабатывает, когда scheduler меняет вид, дни, время и т.д., чтобы отобразить событие, указанное методом 'showEvent', и происходит ПОСЛЕ отображения события."
---

# onAfterEventDisplay

### Description

@short: Срабатывает, когда scheduler меняет вид, дни, время и т.д., чтобы отобразить событие, указанное методом 'showEvent', и происходит ПОСЛЕ отображения события.

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - объект события
- `view` - (required) *string* - название вида, используемого для отображения события

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    //любая ваша логика здесь
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)
