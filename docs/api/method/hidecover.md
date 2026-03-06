---
sidebar_label: hideCover
title: "hideCover method"
description: "hides the lightbox modal overlay that blocks interactions with the remaining screen"
---

# hideCover

### Description

@short: Hides the lightbox modal overlay that blocks interactions with the remaining screen

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - an element to hide

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

If you specify the input parameter, the method will hide the specified HTML object element (by setting the display property to "none").

### Related API
- [showCover](api/method/showcover.md)
