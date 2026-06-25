---
sidebar_label: startLightbox
title: "startLightbox метод"
description: "показывает настраиваемый lightbox внутри указанного HTML-контейнера, центрированный по экрану"
---

# startLightbox

### Description

@short: Показывает настраиваемый lightbox внутри указанного HTML-контейнера, центрированный по экрану

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - идентификатор события
- `box` - (required) *HTMLElement* - HTML-контейнер lightbox

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
- [Полностью настраиваемый lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

Чтобы скрыть настраиваемый lightbox, можно использовать метод [endLightbox](api/method/endlightbox.md).

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- [Полностью настраиваемый lightbox](guides/custom-details-form.md)