---
sidebar_label: "startLightbox"
title: "startLightbox method"
description: "zeigt eine benutzerdefinierte Lightbox innerhalb des angegebenen HTML-Containers an, zentriert auf dem Bildschirm"
---

# startLightbox

### Description

@short: Zeigt eine benutzerdefinierte Lightbox innerhalb des angegebenen HTML-Containers an, zentriert auf dem Bildschirm

@signature: startLightbox: (id: string, box: HTMLElement) =\> void

### Parameters

- `id` - (required) *string* - die ID des Events
- `box` - (required) *HTMLElement* - der HTML-Container für die Lightbox

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

Um eine benutzerdefinierte Lightbox zu schließen, können Sie die Methode [endLightbox](api/method/endlightbox.md) verwenden.

### Related API
- [endLightbox](api/method/endlightbox.md)
- [showLightbox](api/method/showlightbox.md)

### Related Guides
- [Vollständig individuelles Lightbox](guides/custom-details-form.md)
