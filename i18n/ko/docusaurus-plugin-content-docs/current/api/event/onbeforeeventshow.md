---
sidebar_label: onBeforeEventShow
title: "onBeforeEventShow 이벤트"
description: "'showEvent' 메서드가 요청한 이벤트를 Scheduler가 표시하기 전에 발생합니다"
---

# onBeforeEventShow

### 설명

@short: `showEvent` 메서드가 요청한 이벤트를 Scheduler가 표시하기 전에 발생합니다

@signature: onBeforeEventShow: (event: object, view: string) =\> boolean

### 매개변수

- `event` - (필수) *object* - 이벤트 객체
- `view` - (필수) *string* - 이벤트를 표시하는 뷰 이름

### 반환값

- `result` - (boolean) - 기본 작업을 실행할지(**true**) 취소할지(**false**) 정의합니다

### 예제

~~~js
scheduler.attachEvent("onBeforeEventShow", function(event, view){
    return true;
});
~~~

### 세부 정보

이 이벤트는 `showEvent()` 수명 주기에 속합니다. Scheduler가 일반 이벤트를 렌더링할 때는 실행되지 않으므로 렌더링 이벤트 필터링에는 [onBeforeEventDisplay](api/event/onbeforeeventdisplay.md)를 사용하세요.

### v7.2에서 마이그레이션

이 이벤트는 이전 `onBeforeEventDisplay(event, view)` 수명 주기 이벤트를 대체합니다. 이벤트 이름을 `onBeforeEventShow`로 변경하세요. `(event, view)` 인수는 그대로입니다.

### 관련 API

- [showEvent](api/method/showevent.md)
- [onAfterEventShow](api/event/onaftereventshow.md)
- [v7.2에서 v8.0으로 마이그레이션](migration.md#event-display-and-showevent-lifecycle-events)