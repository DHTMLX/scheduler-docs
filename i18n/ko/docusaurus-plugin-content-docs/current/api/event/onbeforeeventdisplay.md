---
sidebar_label: onBeforeEventDisplay
title: "onBeforeEventDisplay 이벤트"
description: "렌더링 전에 이벤트를 필터링합니다"
---

# onBeforeEventDisplay

### 설명

@short: 이벤트 렌더링 전에 발생하며 표시를 막을 수 있습니다

@signature: onBeforeEventDisplay: (id: string | number, event: object) =\> boolean

### 매개변수

- `id` - (필수) *string | number* - 이벤트 ID
- `event` - (필수) *object* - 이벤트 객체

### 반환값
- `result` - (boolean) - 기본 작업을 실행할지(**true**) 취소할지(**false**) 정의합니다

### 예제

~~~jsx
scheduler.attachEvent("onBeforeEventDisplay", function(id, event){
    return event.priority !== "low";
});
~~~

### 세부 정보

반복 이벤트 인스턴스와 미니 캘린더 표시에 사용되는 이벤트를 포함하여 렌더링 대상으로 고려되는 모든 이벤트에 대해 발생합니다. 현재 뷰의 `filter_<view>` 함수와 함께 실행됩니다.

여러 `onBeforeEventDisplay` 핸들러를 연결할 수 있습니다. 뷰 필터와 모든 핸들러가 `true`를 반환해야 이벤트가 표시됩니다. 한 핸들러를 분리해도 나머지에는 영향을 주지 않습니다.

### v7.2에서 마이그레이션

v7.2에서 `onBeforeEventDisplay(event, view)`는 `showEvent()` 수명 주기에 속했습니다. v8.0에서는 해당 동작에 [onBeforeEventShow](api/event/onbeforeeventshow.md)를 사용하세요. v8.0의 `onBeforeEventDisplay`는 이 페이지에 설명된 렌더링 조건이며 `(id, event)`를 받습니다.

### 관련 API
- [onBeforeEventShow](api/event/onbeforeeventshow.md)
- [onAfterEventShow](api/event/onaftereventshow.md)