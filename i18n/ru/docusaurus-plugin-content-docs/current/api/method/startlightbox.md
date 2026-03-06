---
sidebar_label: "startLightbox"
title: "startLightbox method"
description: "отображает кастомный лайтбокс внутри указанного HTML контейнера, центрированного на экране"
---

# startLightbox

### Description

@short: Отображает кастомный лайтбокс внутри указанного HTML контейнера, центрированного на экране

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - id события
- `box` - (required) *HTMLElement* - HTML контейнер для лайтбокса

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

Чтобы закрыть кастомный лайтбокс, можно использовать метод [endLightbox](api/method/endlightbox.md).

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- [Полностью настраиваемый лайтбокс](guides/custom-details-form.md)
