---
sidebar_label: "clearAll"
title: "clearAll method"
description: "스케줄러에서 모든 이벤트를 제거합니다."
---

# clearAll

### Description

@short: 스케줄러에서 모든 이벤트를 제거합니다.

@signature: clearAll: () =\> void

### Example

~~~jsx
scheduler.clearAll();
~~~

### Details

이 메서드는 [onClearAll](api/event/onclearall.md) 이벤트를 트리거한다는 점을 유의하세요.

### Related API
- [onClearAll](api/event/onclearall.md)
