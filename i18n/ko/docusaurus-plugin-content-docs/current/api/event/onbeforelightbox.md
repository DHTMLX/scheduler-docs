---
sidebar_label: "onBeforeLightbox"
title: "onBeforeLightbox event"
description: "사용자가 라이트박스(편집 폼)를 열기 직전에 발생하는 이벤트입니다."
---

# onBeforeLightbox

### Description

@short: 사용자가 라이트박스(편집 폼)를 열기 직전에 발생하는 이벤트입니다.

@signature: onBeforeLightbox: (id: string) =\> boolean

### Parameters

- `id` - (required) *string* - 이벤트의 id

### Returns
- ` result` - (boolean) - 이벤트의 기본 동작이 진행될지(<b>true</b>) 중단될지(<b>false</b>) 결정합니다.

### Example

~~~jsx
scheduler.attachEvent("onBeforeLightbox", function (id){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return true;
});
~~~

### Related samples
- [Linking select controls in the lightbox](https://docs.dhtmlx.com/scheduler/samples/02_customization/26_linked_selects_in_lightbox.html)
- [Dynamic changing of lightbox configurations](https://docs.dhtmlx.com/scheduler/samples/02_customization/29_changing_lightbox_configurations.html)

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 기본 동작(라이트박스 열기)이 중단됩니다.
