---
sidebar_label: startLightbox
title: "startLightbox method"
description: "shows a custom lightbox in the specified HTML container centered on the screen"
---

# startLightbox

### Description

@short: Shows a custom lightbox in the specified HTML container centered on the screen

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - the event's id
- `box` - (required) *HTMLElement* - the lightbox's HTML container

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

To hide a custom lightbox you can use the [endLightbox](api/method/endlightbox.md) method.

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- [Fully Custom Lightbox](guides/custom-details-form.md)
