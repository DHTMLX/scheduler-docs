---
sidebar_label: showCover
title: "Метод showCover"
description: "показывает lightbox модальный оверлей, который блокирует взаимодействие с остальной частью экрана"
---

# showCover

### Description

@short: Показывает lightbox модальный оверлей, который блокирует взаимодействие с остальной частью экрана

@signature: showCover: (box?: HTMLElement) => void

### Parameters
- `box` - (optional) *HTMLElement* - элемент, который нужно показать

### Example

~~~jsx
scheduler.hideCover();
...
scheduler.showCover();
~~~

### Details

Если указан входной параметр, метод отобразит указанный HTML-элемент (установив свойство display в «block»), разместив его по центру экрана.

### Related API
- [hideCover](api/method/hidecover.md)