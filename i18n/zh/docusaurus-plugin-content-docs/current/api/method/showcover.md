---
sidebar_label: "showCover"
title: "showCover method"
description: "显示一个 lightbox 模态覆盖层，防止与屏幕其他部分进行交互"
---

# showCover

### Description

@short: 显示一个 lightbox 模态覆盖层，防止与屏幕其他部分进行交互

@signature: showCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 要显示的元素

### Example

~~~jsx
scheduler.hideCover();
...
scheduler.showCover();
~~~

### Details

当您提供一个元素作为参数时，此方法会通过将该 HTML 元素的 display 属性设置为 "block" 来显示它，并将其居中显示在屏幕上。

### Related API
- [hideCover](api/method/hidecover.md)
