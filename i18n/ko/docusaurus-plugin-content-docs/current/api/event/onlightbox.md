---
sidebar_label: "onLightbox"
title: "onLightbox event"
description: "사용자가 라이트박스(편집 폼)를 열자마자 트리거됩니다."
---

# onLightbox

### Description

@short: 사용자가 라이트박스(편집 폼)를 열자마자 트리거됩니다.

@signature: onLightbox: () =\> void

### Parameters

- `id` - (required) *string* - 이벤트의 ID

### Example

~~~jsx
scheduler.attachEvent("onLightbox", function (id){
    //여기에 커스텀 로직 작성
});
~~~

### Details

이 이벤트는 라이트박스의 다양한 요소를 커스터마이징할 때 유용합니다.
