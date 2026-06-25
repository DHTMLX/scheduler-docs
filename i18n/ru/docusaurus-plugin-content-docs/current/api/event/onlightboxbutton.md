---
sidebar_label: onLightboxButton
title: "onLightboxButton event"
description: "срабатывает, когда пользователь нажимает на пользовательскую кнопку в lightbox"
---

# onLightboxButton

### Description

@short: срабатывает, когда пользователь нажимает на пользовательскую кнопку в lightbox

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор кнопки
- `node` - (required) *HTMLElement* - HTML-элемент нажатой кнопки
- `e` - (required) *Event* - объект нативного события 'click'

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // любая ваша логика здесь
});
~~~

### Related samples
- [Настройка/получение значений контролов lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

Событие срабатывает только для пользовательских кнопок в нижней части lightbox и не срабатывает для кнопок по умолчанию или разделов.

Чтобы проверить, открыт ли lightbox в данный момент, используйте свойство **lightbox_id** объекта состояния, возвращаемого методом [getState](api/method/getstate.md). 
Если lightbox открыт, метод вернет id открытого события, в противном случае вернутся 'null' или 'undefined':

~~~js
if (scheduler.getState().lightbox_id){
    // логика для случая, когда lightbox открыт
} else {
    // логика для случая, когда lightbox закрыт
}
~~~

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md#checking-whether-the-lightbox-is-opened)