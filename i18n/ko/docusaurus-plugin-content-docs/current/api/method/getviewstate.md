---
sidebar_label: getViewState
title: "getViewState 메서드"
description: 마지막으로 완료된 Scheduler 뷰 상태를 반환합니다
---

# getViewState

### 설명

@short: 마지막으로 완료된 Scheduler 뷰 상태를 반환합니다

@signature: getViewState(): ViewState | null

### 반환값

- `state` - (ViewState | null) - 마지막으로 게시된 뷰 상태 또는 첫 렌더링이 완료되기 전 `null`

### 예제

~~~js
const state = scheduler.getViewState();
if (state) {
  console.log(state.mode, state.label);
}
~~~

### 세부 정보

Scheduler가 관리하는 현재 모드, 날짜, 날짜 레이블 및 ARIA 레이블을 반환하며 첫 렌더링이 완료되기 전에는 `null`을 반환합니다. 반환된 날짜는 복사본입니다. 이 상태는 직접 `updateView()`를 호출한 후를 포함하여 Toolbar `views` 값보다 우선합니다.
