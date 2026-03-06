---
sidebar_label: "showCover"
title: "showCover method"
description: "zeigt ein Lightbox-Modal-Overlay an, das die Interaktion mit dem restlichen Bildschirm verhindert"
---

# showCover

### Description

@short: Zeigt ein Lightbox-Modal-Overlay an, das die Interaktion mit dem restlichen Bildschirm verhindert

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - ein anzuzeigendes Element

### Example

~~~jsx
scheduler.hideCover();
...
scheduler.showCover();
~~~

### Details

Wenn Sie ein Element als Parameter übergeben, zeigt diese Methode dieses HTML-Element an, indem sie seine display-Eigenschaft auf "block" setzt und es zentriert auf dem Bildschirm darstellt.

### Related API
- [hideCover](api/method/hidecover.md)
