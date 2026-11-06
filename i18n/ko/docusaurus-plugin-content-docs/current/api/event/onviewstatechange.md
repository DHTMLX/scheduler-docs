---
sidebar_label: onViewStateChange
title: "onViewStateChange 이벤트"
description: Scheduler가 뷰 상태를 게시한 후 발생합니다
---

# onViewStateChange

### 설명

@short: Scheduler가 뷰 상태를 게시한 후 발생합니다

@signature: onViewStateChange: (state: ViewState) => void

### 매개변수

- `state` - (필수) *ViewState* - 게시된 Scheduler 뷰 상태

### 예제

~~~js
scheduler.attachEvent("onViewStateChange", state => {
    document.title = state.label;
});
~~~

### 세부 정보

Scheduler가 모드, 날짜, 날짜 레이블 또는 ARIA 뷰 상태를 게시한 후 발생합니다. `getViewState()`와 같은 형태를 전달하며 직접 `updateView()`를 호출한 후에도 실행됩니다.
