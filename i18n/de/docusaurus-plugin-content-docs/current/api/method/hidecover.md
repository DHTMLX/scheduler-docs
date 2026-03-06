---
sidebar_label: "hideCover"
title: "hideCover method"
description: "Entfernt die Lightbox-Modal-Overlay, die die Interaktion mit dem restlichen Bildschirm verhindert"
---

# hideCover

### Description

@short: Entfernt die Lightbox-Modal-Overlay, die die Interaktion mit dem restlichen Bildschirm verhindert

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - Das Element, das ausgeblendet werden soll

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

Wenn Sie den Eingabeparameter angeben, blendet diese Methode das angegebene HTML-Element aus, indem der Display-Stil auf "none" gesetzt wird.

### Related API
- [showCover](api/method/showcover.md)
