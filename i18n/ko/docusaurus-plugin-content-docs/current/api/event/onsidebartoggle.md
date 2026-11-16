---
sidebar_label: onSidebarToggle
title: "onSidebarToggle 이벤트"
description: "표시된 Sidebar 상태가 변경될 때 발생합니다"
---

# onSidebarToggle

### 설명

@short: 표시된 Sidebar 상태가 변경될 때 발생합니다

@signature: onSidebarToggle: (collapsed: boolean, overlay: boolean) => void

### 매개변수

- `collapsed` - (필수) *boolean* - Sidebar가 숨겨져 있는지 여부
- `overlay` - (필수) *boolean* - Sidebar가 오버레이로 동작하는지 여부

### 예제

~~~js
scheduler.attachEvent("onSidebarToggle", (collapsed, overlay) => {
    console.log(collapsed ? "Sidebar closed" : overlay ? "Sidebar opened as an overlay" : "Sidebar opened");
});
~~~

### 세부 정보

표시 상태가 변경되면 `show()`, `hide()`, `toggle()` 및 반응형 모드 변경 후 이벤트가 발생합니다. Sidebar 플러그인이 필요합니다.