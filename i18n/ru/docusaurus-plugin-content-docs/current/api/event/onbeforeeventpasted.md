---
sidebar_label: onBeforeEventPasted
title: "onBeforeEventPasted event"
description: "срабатывает перед тем, как пользователь нажимает сочетание клавиш 'CTRL+V'." 
---

# onBeforeEventPasted

### Description

@short: Срабатывает перед тем, как пользователь нажимает сочетание клавиш 'CTRL+V'

@signature: onBeforeEventPasted: (isCopy: boolean, pasted_ev: object, original_ev: object) => boolean

### Parameters

- `isCopy` - (required) *boolean* - указывает, было ли событие скопировано или вырезано перед вставкой. Значение <em>true</em> означает, что событие было скопировано
- `pasted_ev` - (required) *object* - объект нового элемента данных (событие, создаваемое после вставки)
- `original_ev` - (required) *object* - объект исходного элемента данных (событие, которое было скопировано/вырезано)

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию события (<b>true</b>) или отменено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeEventPasted", function(isCopy,pasted_ev,original_ev) {
    // здесь вы можете изменить `pastedEvent`
    return true; 
});
~~~

### Details

Расширение навигации клавиатурой должно быть включено.

### Related API
- [onEventPasted](api/event/oneventpasted.md)