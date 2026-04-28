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

- `box` - (optional) *HTMLElement* - элемент, который нужно скрыть

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

Если вы укажете входной параметр, метод скроет указанный HTML-объект (установив свойство display в значение "none").

### Related API
- [showCover](api/method/showcover.md)