---
sidebar_label: "destructor"
title: "destructor method"
description: "스케줄러 인스턴스를 제거합니다"
---

# destructor

### Description

@short: 스케줄러 인스턴스를 제거합니다

@signature: destructor: () =\> void

### Example

~~~jsx
var myScheduler = Scheduler.getSchedulerInstance();
 
// 스케줄러 인스턴스 제거
myScheduler.destructor();
~~~

### Details

이 메서드는 스케줄러 인스턴스를 제거하고 [onDestroy](api/event/ondestroy.md) 이벤트를 트리거합니다.

destructor가 호출되면 다음 작업이 수행됩니다:

- 스케줄러 인스턴스에 로드된 모든 데이터를 초기화합니다
- 스케줄러에 연결된 경우 [DataProcessor](api/method/dataprocessor.md)를 파괴합니다
- 스케줄러를 DOM에서 제거합니다
- [event](api/method/event.md) 메서드를 통해 바인딩된 모든 DOM 이벤트를 해제합니다

:::note

멀티플 스케줄러 인스턴스를 지원하지 않는 패키지(GPL 또는 Individual 에디션)의 경우, destructor를 호출하면 페이지가 새로고침될 때까지 스케줄러를 사용할 수 없게 됩니다.
 
:::

### Related API
- [onDestroy](api/event/ondestroy.md)

### Related Guides
- ["페이지에서 여러 개의 Scheduler 생성하기"](guides/multiple-per-page.md#destructor-of-scheduler-and-dataprocessor-instances)

### Change log
- 버전 6.0에 추가됨
