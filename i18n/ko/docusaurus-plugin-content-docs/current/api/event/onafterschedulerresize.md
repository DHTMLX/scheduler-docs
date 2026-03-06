---
sidebar_label: "onAfterSchedulerResize"
title: "onAfterSchedulerResize event"
description: "스케줄러의 크기가 업데이트되고 데이터 영역이 다시 그려진 후 한 번 트리거됩니다."
---

# onAfterSchedulerResize

### Description

@short: 스케줄러의 크기가 업데이트되고 데이터 영역이 다시 그려진 후 한 번 트리거됩니다.

@signature: onAfterSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterSchedulerResize", function(){
    //여기에 사용자 정의 로직 작성
});
~~~
