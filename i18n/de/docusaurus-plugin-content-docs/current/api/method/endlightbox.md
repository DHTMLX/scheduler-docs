---
sidebar_label: "endLightbox"
title: "endLightbox method"
description: "Verwendet, um die Lightbox zu schließen"
---

# endLightbox

### Description

@short: Verwendet, um die Lightbox zu schließen

@signature: endLightbox: (mode: boolean, box?: HTMLElement) =\> void

### Parameters

- `mode` - (required) *boolean* - Wird auf <i>true</i> gesetzt, werden alle Änderungen innerhalb der Lightbox gespeichert, bevor sie geschlossen wird. <br> Wird es auf <i>false</i> gesetzt, werden die Änderungen verworfen.
- `box` - (optional) *HTMLElement* - Das HTML-Element, das die Lightbox enthält

### Example

~~~jsx
scheduler.endLightbox(false);
//oder
scheduler.endLightbox(true, document.getElementById("my_form"));
~~~

### Related samples
- [Fully custom lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/16_custom_form.html)

### Details

:::note

Diese Methode wird typischerweise bei der Arbeit mit einer benutzerdefinierten Lightbox aufgerufen
 
:::
