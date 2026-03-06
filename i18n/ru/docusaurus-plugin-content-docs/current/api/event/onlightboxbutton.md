---
sidebar_label: "onLightboxButton"
title: "onLightboxButton event"
description: "срабатывает, когда пользователь нажимает на кастомную кнопку внутри lightbox"
---

# onLightboxButton

### Description

@short: Срабатывает, когда пользователь нажимает на кастомную кнопку внутри lightbox

@signature: onLightboxButton: (id: string, node: HTMLElement, e: Event) =\> void;

### Parameters

- `id` - (required) *string* - id кнопки
- `node` - (required) *HTMLElement* - HTML-элемент нажатой кнопки
- `e` - (required) *event* - native объект события 'click'

### Example

~~~jsx
scheduler.attachEvent("onLightboxButton", function (id, node, e){
    // здесь разместите любую кастомную логику
});
~~~

### Related samples
- [Setting/getting values of lightbox's controls](https://docs.dhtmlx.com/scheduler/samples/02_customization/22_opertions_with_lightbox.html)

### Details

Это событие срабатывает только для кастомных кнопок, расположенных внизу lightbox. Оно не активируется для дефолтных или секционных кнопок.

Чтобы определить, открыт ли в данный момент lightbox или закрыт, можно проверить свойство **lightbox_id** из объекта состояния, возвращаемого методом [getState](api/method/getstate.md). 
Если lightbox открыт, метод возвращает id активного события; если закрыт - возвращает 'null' или 'undefined':

~~~js
if (scheduler.getState().lightbox_id){
    // логика для случая, когда lightbox открыт
} else {
    // логика для случая, когда lightbox закрыт
}
~~~

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md)
