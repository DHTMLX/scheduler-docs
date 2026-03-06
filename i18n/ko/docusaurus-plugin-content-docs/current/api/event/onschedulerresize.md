---
sidebar_label: "onSchedulerResize"
title: "onSchedulerResize event"
description: "스케줄러의 크기가 변경되기 직전에 트리거됩니다."
---

# onSchedulerResize

### Description

@short: 스케줄러의 크기가 변경되기 직전에 트리거됩니다.

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
      //여기에 커스텀 로직 작성
});
~~~

### Details

이 이벤트는 스케줄러의 크기가 조정되어 데이터 영역을 다시 그려야 할 때 알림을 제공합니다. 일반적으로 커스텀 뷰를 작업하지 않는 한 이 이벤트를 처리할 필요는 없습니다.
