---
sidebar_label: "resetLightbox"
title: "resetLightbox method"
description: "удаляет текущий HTML-элемент lightbox'а"
---

# resetLightbox

### Description

@short: Удаляет текущий HTML-элемент lightbox'а

@signature: resetLightbox: () =\> void

### Example

~~~jsx
var full_lightbox = [
    { name: "description", map_to: "text", type: "textarea", focus: true},
    { name: "time",        map_to: "auto", type: "time"}
];
var restricted_lightbox = [
    { name: "description", map_to: "text", type: "textarea", focus: true},
];
...
scheduler.attachEvent("onBeforeLightbox", function(event_id) {
    scheduler.resetLightbox();
    var ev = scheduler.getEvent(event_id);  
    if (ev.restricted ==true){
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

Этот метод позволяет динамически обновлять конфигурацию lightbox'а: он удаляет текущий элемент lightbox и затем создаёт новый на основе [конфигурации lightbox'а](api/config/lightbox.md).

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md)
