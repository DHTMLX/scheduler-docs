---
sidebar_label: "onLightbox"
title: "onLightbox event"
description: "срабатывает сразу после того, как пользователь открывает lightbox (форму редактирования)"
---

# onLightbox

### Description

@short: Срабатывает сразу после того, как пользователь открывает lightbox (форму редактирования)

@signature: onLightbox: () =\> void

### Parameters

- `id` - (required) *string* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    //любая ваша кастомная логика
});
~~~

### Details

Это событие удобно использовать для настройки различных аспектов lightbox.
