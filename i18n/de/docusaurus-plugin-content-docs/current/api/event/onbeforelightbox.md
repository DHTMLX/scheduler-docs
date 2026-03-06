---
sidebar_label: "onBeforeLightbox"
title: "onBeforeLightbox event"
description: "Wird direkt ausgelöst, bevor der Benutzer die Lightbox (Editierformular) öffnet."
---

# onBeforeLightbox

### Description

@short: Wird direkt ausgelöst, bevor der Benutzer die Lightbox (Editierformular) öffnet.

@signature: onBeforeLightbox: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - die ID des Events

### Returns
- ` result` - (boolean) - bestimmt, ob die Standardaktion für das Event ausgeführt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onBeforeLightbox", function (id){
    // benutzerdefinierte Logik kann hier eingefügt werden
    return true;
});
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

Dieses Event kann blockiert werden. Wenn *false* zurückgegeben wird, wird das Standardverhalten (Öffnen der Lightbox) verhindert.
