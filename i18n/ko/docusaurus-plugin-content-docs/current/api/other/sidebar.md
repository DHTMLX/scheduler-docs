---
sidebar_label: sidebar
title: "sidebar API"
description: "Sidebar 플러그인에 대한 런타임 접근을 제공합니다"
---

# sidebar

### 설명

@short: Sidebar 플러그인에 대한 런타임 접근을 제공합니다

@signature: scheduler.ext.sidebar: SidebarApi

### 예제

~~~js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.init("scheduler_here");
scheduler.ext.sidebar.toggle();
~~~

### 세부 정보

API는 `scheduler.plugins({ sidebar: true })` 이후 사용할 수 있습니다. `show()`, `hide()`, `toggle()`은 렌더링된 패널을 변경합니다. `isCollapsed()`는 표시 상태를, `isOverlay()`는 현재 Sidebar가 오버레이인지 알려 줍니다. `refresh()`는 `scheduler.config.sidebar`를 다시 읽고, `getItemNode(id)`는 항목 노드 또는 `null`을, `getDefaultItems()`는 기본 항목 ID를 반환합니다.

### 관련 가이드

- [Sidebar](guides/sidebar.md)