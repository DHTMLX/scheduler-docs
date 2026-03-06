---
sidebar_label: "resetLightbox"
title: "resetLightbox method"
description: "移除当前 lightbox 的 HTML 对象元素"
---

# resetLightbox

### Description

@short: 移除当前 lightbox 的 HTML 对象元素

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

此方法允许动态更新 lightbox 的配置:它首先移除当前的 lightbox 元素，然后根据[lightbox 配置](api/config/lightbox.md)创建一个新的 lightbox。

### Related Guides
- [Lightbox 조작하기](guides/lightbox-editors-manipulations.md#dynamic-changing-of-the-lightbox-sections)
