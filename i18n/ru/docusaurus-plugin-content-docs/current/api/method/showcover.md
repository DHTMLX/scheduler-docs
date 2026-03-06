---
sidebar_label: "showCover"
title: "showCover method"
description: "отображает модальное оверлейное окно (lightbox), которое блокирует взаимодействие с остальной частью экрана"
---

# showCover

### Description

@short: Отображает модальное оверлейное окно (lightbox), которое блокирует взаимодействие с остальной частью экрана

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - элемент, который нужно отобразить

### Example

~~~jsx
scheduler.hideCover();
...
scheduler.showCover();
~~~

### Details

Если в качестве параметра передать элемент, этот метод отобразит указанный HTML-элемент, установив для него свойство display со значением "block" и центрирует его на экране.

### Related API
- [hideCover](api/method/hidecover.md)
