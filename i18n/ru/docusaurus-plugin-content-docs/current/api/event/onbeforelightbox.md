---
sidebar_label: onBeforeLightbox
title: "onBeforeLightbox событие"
description: "срабатывает непосредственно перед тем, как пользователь откроет lightbox (форму редактирования)"
---

# onBeforeLightbox

### Description

@short: Срабатывает непосредственно перед тем, как пользователь откроет lightbox (форму редактирования)

@signature: onBeforeLightbox: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - идентификатор события

### Returns
- ` result` - (boolean) - определяет, будет ли выполнено действие по умолчанию для события (<b>true</b>) или оно будет остановлено (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeLightbox", function (id){
    // любая ваша логика здесь
    return true;
});
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

Событие можно заблокировать. Вернуть *false*, чтобы отменить обработку по умолчанию (открытие lightbox).