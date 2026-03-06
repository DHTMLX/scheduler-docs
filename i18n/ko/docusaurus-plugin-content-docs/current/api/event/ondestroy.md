---
sidebar_label: "onDestroy"
title: "onDestroy event"
description: "스케줄러가 [destructor](api/method/destructor.md) 메서드를 사용하여 해제된 후 한 번 트리거됩니다."
---

# onDestroy

### Description

@short: 스케줄러가 [destructor](api/method/destructor.md) 메서드를 사용하여 해제된 후 한 번 트리거됩니다.

@signature: onDestroy: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onDestroy", function(){
   alert("free custom resources");
});

scheduler.destructor();
~~~

### Related API
- [destructor](api/method/destructor.md)

### Change log
- v6.0에 추가됨
