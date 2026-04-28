---
sidebar_label: "resetLightbox"
title: "resetLightbox method"
description: "entfernt das aktuelle HTML-Objektelement der Lightbox"
---

# resetLightbox

### Description

@short: Entfernt das aktuelle HTML-Objektelement der Lightbox

@signature: resetLightbox: () =\> void

### Example

~~~jsx
const full_lightbox = [
    { name: "description", map_to: "text", type: "textarea", focus: true},
    { name: "time",        map_to: "auto", type: "time"}
];
const restricted_lightbox = [
    { name: "description", map_to: "text", type: "textarea", focus: true},
];
...
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    const ev = scheduler.getEvent(event_id);  
    if (ev.restricted == true){
        scheduler.config.lightbox.sections = restricted_lightbox;
    } else {
        scheduler.config.lightbox.sections = full_lightbox;
    };   
    return true;
});
~~~

### Related samples
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

Diese Methode ermöglicht es, die Konfiguration der Lightbox dynamisch zu aktualisieren: Sie entfernt das aktuelle Lightbox-Element und erstellt dann basierend auf der [Lightbox-Konfiguration](api/config/lightbox.md) ein neues.

### Related Guides
- [Manipulationen mit dem Lightbox](guides/lightbox-editors-manipulations.md#dynamic-changing-of-the-lightbox-sections)
