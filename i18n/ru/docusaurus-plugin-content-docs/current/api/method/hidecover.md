---
sidebar_label: "hideCover"
title: "hideCover method"
description: "удаляет модальное оверлейное окно lightbox, которое блокирует взаимодействие с остальной частью экрана"
---

# hideCover

### Description

@short: Удаляет модальное оверлейное окно lightbox, которое блокирует взаимодействие с остальной частью экрана

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - элемент, который необходимо скрыть

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

При передаче входного параметра этот метод скрывает указанный HTML-элемент, устанавливая для его свойства display значение "none".

### Related API
- [showCover](api/method/showcover.md)
