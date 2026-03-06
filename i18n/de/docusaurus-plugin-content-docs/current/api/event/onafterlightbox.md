---
sidebar_label: "onAfterLightbox"
title: "onAfterLightbox event"
description: "Wird ausgelöst, sobald der Benutzer die Lightbox (Bearbeitungsformular) schließt."
---

# onAfterLightbox

### Description

@short: Wird ausgelöst, sobald der Benutzer die Lightbox (Bearbeitungsformular) schließt.

@signature: onAfterLightbox: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterLightbox", function (){
    //beliebige benutzerdefinierte Logik hier
});
~~~
