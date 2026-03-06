---
sidebar_label: "resetLightbox"
title: "resetLightbox method"
description: "현재 라이트박스의 HTML 객체 요소를 제거합니다."
---

# resetLightbox

### Description

@short: 현재 라이트박스의 HTML 객체 요소를 제거합니다.

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

이 메서드는 라이트박스 설정을 동적으로 업데이트할 수 있도록 해줍니다: 현재 라이트박스 요소를 제거한 후 [라이트박스 구성](api/config/lightbox.md)에 따라 새로운 요소를 생성합니다.

### Related Guides
- ["Lightbox 조작하기"](guides/lightbox-editors-manipulations.md#dynamic-changing-of-the-lightbox-sections)
