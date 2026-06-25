---
sidebar_label: onLightbox
title: "onLightbox event"
description: "срабатывает после того, как пользователь открыл lightbox (форма редактирования)"
---

# onLightbox

### Description

@short: Срабатывает после того, как пользователь открыл lightbox (форма редактирования)

@signature: onLightbox: () =\> void

### Parameters

- `id` - (обязательно) *string* - идентификатор события

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    // любая ваша логика здесь
});
~~~

### Details

Использование этого события — хороший способ настроить что-то в lightbox.