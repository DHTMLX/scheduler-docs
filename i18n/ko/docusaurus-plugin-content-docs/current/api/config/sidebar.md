---
sidebar_label: sidebar
title: "sidebar 설정"
description: "Scheduler Sidebar 플러그인을 설정합니다"
---

# sidebar

### 설명

@short: Scheduler Sidebar 플러그인을 설정합니다

@signature: sidebar: SidebarConfig | false

### 예제

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

### 세부 정보

`init()` 전에 `sidebar: true`를 활성화하세요. 이 설정이 없으면 Sidebar는 `minicalendar`와, 이벤트 그룹이 설정된 경우 `event_groups`를 사용합니다. 기본값은 `position: "left"`, `width: 260`, `collapsed: false`, `overlay_width: 768`입니다.

`items`에는 내장 ID 또는 사용자 지정 `{ id, css }` 항목이 들어갑니다. 사용자 지정 항목은 `onSidebarItemRender`를 통해 제공되는 빈 노드입니다. 내장 이벤트 그룹 항목은 `label`과 `select_all` 재정의를 지원합니다.

너비가 `overlay_width`보다 작을 때 Sidebar는 Toolbar에 표시되는 `toggle_sidebar` 항목이 렌더링된 경우에만 닫힌 오버레이가 됩니다. 이 컨트롤이 없으면 패널은 도킹된 상태를 유지합니다. `collapsed`는 초기 도킹 상태이며 `scheduler.ext.sidebar`의 런타임 호출은 이 설정에 값을 다시 쓰지 않습니다. 영역을 숨기려면 `sidebar`를 `false`로 설정하세요.

### 관련 API

- [sidebar](api/other/sidebar.md)
- [header](api/config/header.md)

### 관련 가이드

- [Sidebar](guides/sidebar.md)
- [애플리케이션 레이아웃](guides/application-layout.md)