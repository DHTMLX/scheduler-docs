---
sidebar_label: "hideCover"
title: "hideCover method"
description: "移除阻止与屏幕其他部分交互的lightbox模态覆盖层"
---

# hideCover

### Description

@short: 移除阻止与屏幕其他部分交互的lightbox模态覆盖层

@signature: hideCover: (box?: HTMLElement) =\> void

### Parameters

- `box` - (optional) *HTMLElement* - 需要隐藏的元素

### Example

~~~jsx
scheduler.hideCover(scheduler.getLightbox());
~~~

### Details

当提供输入参数时，此方法通过将元素的display样式设置为"none"来隐藏指定的HTML元素。

### Related API
- [showCover](api/method/showcover.md)
