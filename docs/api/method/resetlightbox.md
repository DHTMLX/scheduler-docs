---
sidebar_label: resetLightbox
title: "resetLightbox method"
description: "removes the current lightbox's HTML object element"
---

# resetLightbox

### Description

@short: Removes the current lightbox's HTML object element

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

The method can be used to change the lightbox's configuration dynamically: you call the method to delete the current lightbox object and regenerate 
a new one based on the [lightbox configuration](api/config/lightbox.md).

### Related Guides
- [Manipulations with Lightbox](guides/lightbox-editors-manipulations.md#dynamic-changing-of-the-lightbox-sections)
