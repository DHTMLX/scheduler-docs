---
sidebar_label: "onEventCancel"
title: "onEventCancel event"
description: "срабатывает, когда пользователь нажимает кнопку 'Cancel' в лайтбоксе (форме редактирования)"
---

# onEventCancel

### Description

@short: Срабатывает, когда пользователь нажимает кнопку 'Cancel' в лайтбоксе (форме редактирования)

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `flag` - (required) *boolean* - принимает значение 'true', если пользователь отменяет создание нового события,<br> 'false', если редактируется уже существующее событие

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    //любая ваша логика здесь
});
~~~
