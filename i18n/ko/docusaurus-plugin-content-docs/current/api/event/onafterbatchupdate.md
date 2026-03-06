---
sidebar_label: "onAfterBatchUpdate"
title: "onAfterBatchUpdate event"
description: "[batchUpdate](api/method/batchupdate.md) 메서드 실행이 완료된 직후에 트리거됩니다."
---

# onAfterBatchUpdate

### Description

@short: [batchUpdate](api/method/batchupdate.md) 메서드 실행이 완료된 직후에 트리거됩니다.

@signature: onAfterBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onAfterBatchUpdate", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)

### Change log
- 버전 7.1에 추가됨
