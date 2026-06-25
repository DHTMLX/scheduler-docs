---
sidebar_label: onBeforeTooltip
title: "onBeforeTooltip событие"
description: "срабатывает до отображения tooltip для элемента данных (только при включенном расширении 'tooltip')"
---

# onBeforeTooltip

### Description

@short: Срабатывает до отображения tooltip для элемента данных (только при включенном расширении 'tooltip')

@signature: onBeforeTooltip: (id: string) => boolean

### Parameters

- `id` - (required) *string* - идентификатор элемента данных, для которого будет отображаться tooltip

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    // любая ваша логика здесь
    return true;
});
~~~

### Details

Событие можно заблокировать. Верните *false* — и tooltip не будет отображаться.