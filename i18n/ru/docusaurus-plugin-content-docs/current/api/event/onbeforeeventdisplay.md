---
sidebar_label: "onBeforeEventDisplay"
title: "onBeforeEventDisplay event"
description: "срабатывает непосредственно перед тем, как метод 'showEvent' отображает конкретное событие, позволяя выполнить код до появления события."
---

# onBeforeEventDisplay

### Description

@short: Срабатывает непосредственно перед тем, как метод 'showEvent' отображает конкретное событие, позволяя выполнить код до появления события.

@signature: onBeforeEventDisplay: (event: object, view: string) =\> boolean

### Parameters

- `event` - (required) *object* - объект события
- `view` - (required) *string* - название вида, используемого для отображения события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное действие для события (<b>true</b>) или оно будет отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(event,view){
    //любая ваша логика здесь
    return true;
});
~~~

### Related API
- [onAfterEventDisplay](api/event/onaftereventdisplay.md)
