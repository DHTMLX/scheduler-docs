---
sidebar_label: "onAfterLightbox"
title: "onAfterLightbox event"
description: "사용자가 라이트박스(편집 폼)를 닫을 때 한 번 실행됩니다."
---

# onAfterLightbox

### Description

@short: 사용자가 라이트박스(편집 폼)를 닫을 때 한 번 실행됩니다.

@signature: onAfterLightbox: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterLightbox", function (){
    //여기에 사용자 정의 로직 작성
});
~~~
