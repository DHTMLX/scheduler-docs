---
sidebar_label: "onSchedulerReady"
title: "onSchedulerReady event"
description: "스케줄러가 초기화를 완료했지만 아직 페이지에 표시되기 전 한 번 트리거됩니다."
---

# onSchedulerReady

### Description

@short: 스케줄러가 초기화를 완료했지만 아직 페이지에 표시되기 전 한 번 트리거됩니다.

@signature: onSchedulerReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerReady", function(){
    //여기에 사용자 정의 로직 작성
});
~~~
