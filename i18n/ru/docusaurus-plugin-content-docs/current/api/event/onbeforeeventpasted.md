---
sidebar_label: "onBeforeEventPasted"
title: "onBeforeEventPasted event"
description: "срабатывает непосредственно перед тем, как пользователь нажимает сочетание клавиш 'CTRL+V'"
---

# onBeforeEventPasted

### Description

@short: Срабатывает непосредственно перед тем, как пользователь нажимает сочетание клавиш 'CTRL+V'

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) =\> boolean

### Parameters

- `isCopy` - (required) *boolean* - указывает, было ли событие скопировано или вырезано перед вставкой. Значение <em>true</em> означает, что событие было скопировано
- `pasted_ev` - (required) *object* - новый объект события, созданный после вставки
- `original_ev` - (required) *object* - оригинальный объект события, который был скопирован или вырезан

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено стандартное поведение события (<b>true</b>) или оно будет заблокировано (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // здесь вы можете изменить `pastedEvent`
    return true; 
});
~~~

### Details

Убедитесь, что расширение 'keyboard navigation' включено.

### Related API
- [onEventPasted](api/event/oneventpasted.md)
