---
sidebar_label: "startLightbox"
title: "startLightbox method"
description: "在指定的 HTML 容器内显示自定义的 lightbox，并居中显示在屏幕上"
---

# startLightbox

### Description

@short: 在指定的 HTML 容器内显示自定义的 lightbox，并居中显示在屏幕上

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - 事件的 id
- `box` - (required) *HTMLElement* - lightbox 的 HTML 容器

### Example

~~~jsx
<div id="my_form">
    ...
</div>

<script>
scheduler.showLightbox = function(id) {
    scheduler.startLightbox(id, document.getElementById("my_form"));
    ...
};
</script>
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

要关闭自定义 lightbox，可以使用 [endLightbox](api/method/endlightbox.md) 方法。

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- [완전히 커스텀된 라이트박스](guides/custom-details-form.md)
