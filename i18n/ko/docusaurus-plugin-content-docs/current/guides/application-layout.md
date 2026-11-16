---
title: "애플리케이션 레이아웃"
sidebar_label: "애플리케이션 레이아웃"
description: "Toolbar, Sidebar 및 이벤트 그룹으로 Scheduler 레이아웃 만들기"
---

# 애플리케이션 레이아웃

Toolbar와 Sidebar 플러그인을 사용하여 이벤트 캘린더 레이아웃을 만드세요. 이벤트 그룹은 캘린더 목록 데이터를 제공하고 비활성 그룹을 필터링하며 그룹 색상을 적용하는 Scheduler 핵심 기능입니다.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.event_groups = { list: "event_groups", property: "group" };
scheduler.init("scheduler_here");
scheduler.parse({ data, collections: { event_groups } });
```

헤더 또는 Sidebar 설정이 없으면 Scheduler는 다음 헤더를 렌더링합니다.

```js
["toggle_sidebar", "add_event", "spacer", "prev", "date", "next", "spacer", "today", "views"]
```

Sidebar에는 `minicalendar`와 `event_groups`가 있으며 너비는 260픽셀이고 768픽셀 미만에서 오버레이가 됩니다. 이벤트 그룹 목록은 영어에서 **Calendars**로 표시되지만 API는 데이터 모델을 계속 이벤트 그룹이라고 부릅니다.

사용자가 이벤트 그룹을 선택해야 하면 lightbox 섹션을 추가하세요.

```js
scheduler.locale.labels.section_event_group = "Calendar";
scheduler.config.lightbox.sections = [
  { name: "description", type: "textarea", map_to: "text" },
  { name: "event_group", type: "select", map_to: "group", options: scheduler.serverList("event_groups") },
  { name: "time", type: "time", map_to: "auto" }
];
```

## 한 부분 변경

레이아웃을 다시 만들지 않고 뷰 메뉴를 사용하거나 이벤트 그룹 레이블을 변경할 수 있습니다.

```js
scheduler.config.header = ["toggle_sidebar", "prev", "date", "next", { id: "views", comp: "menu" }];
scheduler.config.sidebar = {
  items: ["minicalendar", { id: "event_groups", label: "My calendars" }]
};
```

## 애플리케이션 콘텐츠 추가

Toolbar `container` 항목과 사용자 지정 Sidebar 항목은 애플리케이션이 소유하는 빈 노드입니다.

```js
scheduler.config.header = ["prev", { id: "search", comp: "container" }, "next"];
scheduler.config.sidebar = { items: [{ id: "summary" }, "minicalendar", "event_groups"] };

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.innerHTML = '<input aria-label="Search events">';
});
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "summary") node.textContent = "Upcoming work";
});
```

프레임워크 래퍼가 이 콘텐츠를 직접 소유할 수 있습니다. React `toolbarComponents` / `sidebarComponents`, Vue `toolbar-components` / `sidebar-components`, Angular `[toolbarComponents]` / `[sidebarComponents]`를 통해 항목 ID를 매핑하세요. 래퍼는 portal, teleport 또는 Angular 컴포넌트 인스턴스를 같은 안정적인 노드에 마운트하고 항목이나 Scheduler가 제거될 때 정리합니다. [React](integrations/react/configuration-props.md#toolbar-and-sidebar-components), [Vue](integrations/vue/configuration-props.md#toolbar-and-sidebar-components), [Angular](integrations/angular/configuration-props.md#toolbar-and-sidebar-components) 설정 가이드를 참조하세요.

## 기존 Scheduler 마크업

`init()`에 전달한 요소에 레거시 Scheduler 마크업이 이미 있으면 Toolbar와 Sidebar는 영구 마크업 폴백을 사용합니다. Scheduler는 해당 마크업을 유지하고 레이아웃 셸, Toolbar 또는 Sidebar를 만들지 않습니다. 레이아웃 플러그인을 활성화하기 전에 레거시 자식 마크업을 빈 호스트로 교체하세요.

[Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md), [이벤트 그룹](guides/event-groups.md), [header](api/config/header.md)를 참조하세요.

- [Toolbar 레이아웃 샘플](https://docs.dhtmlx.com/scheduler/samples/16_layout/01_toolbar.html)
- [Sidebar 레이아웃 샘플](https://docs.dhtmlx.com/scheduler/samples/16_layout/02_sidebar.html)
- [완전한 반응형 애플리케이션 레이아웃](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)
