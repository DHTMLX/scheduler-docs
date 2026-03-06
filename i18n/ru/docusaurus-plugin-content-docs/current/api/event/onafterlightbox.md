---
sidebar_label: "onAfterLightbox"
title: "onAfterLightbox event"
description: "срабатывает сразу после того, как пользователь закрывает lightbox (форму редактирования)"
---

# onAfterLightbox

### Description

@short: Срабатывает сразу после того, как пользователь закрывает lightbox (форму редактирования)

@signature: onAfterLightbox: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterLightbox", function (){
    //любая ваша кастомная логика здесь
});
~~~
