---
sidebar_label: "onBeforeBatchUpdate"
title: "onBeforeBatchUpdate event"
description: "[batchUpdate](api/method/batchupdate.md) 메서드가 실행되기 바로 전에 트리거됩니다."
---

# onBeforeBatchUpdate

### Description

@short: [batchUpdate](api/method/batchupdate.md) 메서드가 실행되기 바로 전에 트리거됩니다.

@signature: onBeforeBatchUpdate: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onBeforeBatchUpdate", function(){
    // 여기에 코드 작성
});
~~~

### Related API
- [batchUpdate](api/method/batchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)

### Change log
- 버전 7.1에 추가됨
