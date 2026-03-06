---
sidebar_label: "onLightbox"
title: "onLightbox event"
description: "Wird unmittelbar ausgelöst, nachdem der Benutzer die Lightbox (Editierformular) öffnet."
---

# onLightbox

### Description

@short: Wird unmittelbar ausgelöst, nachdem der Benutzer die Lightbox (Editierformular) öffnet.

@signature: onLightbox: () =\> void

### Parameters

- `id` - (required) *string* - die ID des Events

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event ist nützlich, um verschiedene Aspekte der Lightbox anzupassen.
