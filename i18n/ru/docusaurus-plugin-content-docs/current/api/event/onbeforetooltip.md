---
sidebar_label: "onBeforeTooltip"
title: "onBeforeTooltip event"
description: "срабатывает непосредственно перед появлением tooltip для элемента данных (только когда активировано расширение 'tooltip')"
---

# onBeforeTooltip

### Description

@short: Срабатывает непосредственно перед появлением tooltip для элемента данных (только когда активировано расширение 'tooltip')

@signature: onBeforeTooltip: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - ID элемента данных, для которого собирается показать tooltip

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeTooltip", function (id){
    //любая кастомная логика здесь
    return true;
});
~~~

### Details

Это событие можно заблокировать. Возврат *false* предотвратит отображение tooltip.
