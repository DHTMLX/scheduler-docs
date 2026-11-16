---
sidebar_label: onLayoutSizeChange
title: "onLayoutSizeChange 이벤트"
description: 표시 중인 Scheduler 레이아웃의 크기가 변경될 때 발생합니다
---

# onLayoutSizeChange

### 설명

@short: 표시된 레이아웃 셸의 크기가 변경될 때 발생합니다

@signature: onLayoutSizeChange: (size: LayoutSize) => void

### 매개변수

- `size` - (필수) *LayoutSize* - 정수 픽셀 단위의 `{ width, height }` 셸 크기

### 예제

~~~js
scheduler.attachEvent("onLayoutSizeChange", size => {
  scheduler.config.header = size.width < 600 ? compactHeader : wideHeader;
});
~~~

### 세부 정보

표시된 Toolbar 또는 Sidebar 셸 모드에서 `clientWidth`나 `clientHeight`가 변경될 때 발생합니다. Toolbar 헤더 조정 전에 `{ width, height }`를 전달하므로 핸들러가 같은 렌더링에서 반응형 헤더를 선택할 수 있습니다.

[모바일 반응형 Scheduler](guides/touch-support.md)를 참조하세요.
