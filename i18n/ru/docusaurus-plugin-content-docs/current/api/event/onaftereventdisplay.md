---
sidebar_label: onAfterEventDisplay
title: "onAfterEventDisplay событие"
description: "срабатывает, когда планировщик переключает виды, дни, время и т. д., чтобы показать событие, указанное методом 'showEvent', и срабатывает после отображения события"
---

# onAfterEventDisplay

### Description

@short: Срабатывает, когда планировщик переключает виды, дни, время и т. д. для отображения события, указанного методом 'showEvent', и срабатывает после отображения события

@signature: onAfterEventDisplay: (event: object, string: view) =\> void

### Parameters

- `event` - (required) *object* - объект события
- `view` - (required) *string* - название вида, используемого для отображения события

### Example

~~~jsx
scheduler.attachEvent("onAfterEventDisplay", function(event,view){
    // любая ваша логика здесь
});
~~~

### Related API
- [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)