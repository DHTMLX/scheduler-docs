---
sidebar_label: resetLightbox
title: "Метод resetLightbox"
description: "удаляет HTML-объект текущего lightbox"
---

# resetLightbox

### Description

@short: Удаляет HTML-объект текущего lightbox

@signature: resetLightbox: () => void

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
- [Динамическое изменение конфигураций lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

Метод можно использовать для динамического изменения конфигурации lightbox: вы вызываете метод, чтобы удалить текущий объект lightbox и сгенерировать новый на основе [конфигурации lightbox](api/config/lightbox.md).

### Related Guides
- [Манипуляции с Lightbox](guides/lightbox-editors-manipulations.md#dynamic-changing-of-the-lightbox-sections)