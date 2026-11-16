---
sidebar_label: onSidebarItemRender
title: "onSidebarItemRender 이벤트"
description: "사용자 지정 Sidebar 항목이 마운트될 때 발생합니다"
---

# onSidebarItemRender

### 설명

@short: 사용자 지정 Sidebar 항목이 마운트될 때 발생합니다

@signature: onSidebarItemRender: (id: string, node: HTMLElement) => void

### 매개변수

- `id` - (필수) *string* - 사용자 지정 항목 ID
- `node` - (필수) *HTMLElement* - 빈 항목 컨테이너

### 예제

~~~js
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
    if (id === "summary") node.textContent = "Upcoming events";
});
~~~

### 세부 정보

이 이벤트는 사용자 지정 `{ id }` Sidebar 항목에 대해 발생합니다. 내장 `minicalendar`와 `event_groups` 항목은 자체 콘텐츠를 관리합니다.