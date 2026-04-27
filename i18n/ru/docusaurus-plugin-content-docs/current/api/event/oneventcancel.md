---
sidebar_label: onEventCancel
title: "onEventCancel event"
description: "срабатывает при нажатии пользователем кнопки 'Cancel' в lightbox (форме редактирования)"
---

# onEventCancel

### Description

@short: Срабатывает, когда пользователь нажимает кнопку 'Cancel' в lightbox (форме редактирования)

@signature: onEventCancel: (id: string, flag: boolean) =\> void;

### Parameters

- `id` - (required) *string* - идентификатор события
- `flag` - (required) *boolean* - возвращает 'true', если пользователь отменяет новое событие,<br> 'false' - если редактируемое событие уже существует

### Example

~~~jsx
scheduler.attachEvent("onEventCancel", function(id, flag){
    // любая ваша логика здесь
});
~~~