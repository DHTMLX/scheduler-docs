---
sidebar_label: onAfterEventShow
title: "onAfterEventShow 이벤트"
description: "'showEvent' 메서드가 요청한 이벤트를 Scheduler가 표시한 후 발생합니다"
---

# onAfterEventShow

### 설명

@short: `showEvent` 메서드가 요청한 이벤트를 Scheduler가 표시한 후 발생합니다

@signature: onAfterEventShow: (event: object, view: string) =\> void

### 매개변수

- `event` - (필수) *object* - 이벤트 객체
- `view` - (필수) *string* - 이벤트를 표시하는 뷰 이름

### 예제

~~~js
scheduler.attachEvent("onAfterEventShow", function(event, view){
    console.log("event is displayed in " + view);
});
~~~

### 세부 정보

이 이벤트는 `showEvent()` 수명 주기에 속하며 Scheduler가 요청한 이벤트가 포함된 뷰로 전환한 후 발생합니다.

### v7.2에서 마이그레이션

이 이벤트는 이전 `onAfterEventDisplay(event, view)` 수명 주기 이벤트를 대체합니다. 이벤트 이름을 `onAfterEventShow`로 변경하세요. `(event, view)` 인수는 그대로입니다.

### 관련 API

- [showEvent](api/method/showevent.md)
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [v7.2에서 v8.0으로 마이그레이션](migration.md#event-display-and-showevent-lifecycle-events)