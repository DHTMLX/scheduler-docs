---
sidebar_label: getLayoutSize
title: "getLayoutSize 메서드"
description: 표시 중인 Scheduler 레이아웃의 크기를 반환합니다
---

# getLayoutSize

### 설명

@short: 표시된 레이아웃 셸 크기를 반환합니다

@signature: getLayoutSize(): LayoutSize | null

### 반환값

- `size` - (LayoutSize | null) - `{ width, height }` 형식의 표시된 셸 크기 또는 표시된 레이아웃 셸이 없을 때 `null`

### 예제

~~~js
const size = scheduler.getLayoutSize();
if (size && size.width < 600) {
  scheduler.config.header = compactHeader;
}
~~~

### 세부 정보

셸의 정수 `clientWidth`와 `clientHeight`에서 측정한 `{ width, height }`를 반환합니다. Toolbar 또는 Sidebar가 표시되는 셸을 만들 때 사용할 수 있으며 레이아웃 플러그인이 활성화되지 않았거나 셸이 분리 또는 숨김 상태면 `null`을 반환합니다.

[Toolbar](guides/toolbar.md)와 [Sidebar](guides/sidebar.md)를 참조하세요.
