---
sidebar_label: "onClearAll"
title: "onClearAll event"
description: "스케줄러의 데이터가 모두 삭제된 후 한 번 호출됩니다."
---

# onClearAll

### Description

@short: 스케줄러의 데이터가 모두 삭제된 후 한 번 호출됩니다.

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    //여기에 사용자 정의 로직 작성
});
~~~

### Details

이 이벤트는 [clearAll](api/method/clearall.md) 메서드에서 호출됩니다.
