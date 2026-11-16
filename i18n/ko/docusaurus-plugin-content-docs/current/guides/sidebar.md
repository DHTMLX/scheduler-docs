---
title: Sidebar
sidebar_label: Sidebar
---

# Sidebar

Sidebar 플러그인은 Scheduler 캘린더 옆에 패널을 렌더링합니다. `init()` 전에 활성화하세요.

```js
scheduler.plugins({ toolbar: true, sidebar: true });
scheduler.config.sidebar = {
  position: "left",
  width: 260,
  overlay_width: 768,
  items: ["minicalendar", "event_groups"]
};
scheduler.init("scheduler_here");
```

`minicalendar`와 `event_groups`가 기본 항목입니다. 이벤트 그룹 항목은 `scheduler.config.event_groups`가 활성화된 경우에만 표시됩니다. 처음부터 접힌 패널은 `collapsed: true`, 오른쪽 배치는 `position: "right"`, 비활성화는 `sidebar: false`를 사용하세요.

너비가 `overlay_width`보다 작을 때 패널은 표시되는 `toggle_sidebar` Toolbar 항목이 있는 경우에만 닫힌 오버레이가 됩니다. 사용자 지정 헤더 또는 독립형 Toolbar에 해당 항목을 포함하세요. 토글이 없거나 Toolbar가 비활성화된 경우 패널은 도킹된 상태를 유지합니다.

## Sidebar 설정

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `position` | *"left" \| "right"* | 패널이 있는 Scheduler 측면입니다. 기본값은 `"left"`입니다. |
| `width` | *number* | 도킹된 Sidebar 너비(픽셀)입니다. 기본값은 `260`입니다. |
| `collapsed` | *boolean* | 도킹된 Sidebar를 처음에 숨길지 여부입니다. 기본값은 `false`입니다. |
| `overlay_width` | *number* | Sidebar가 오버레이가 될 수 있는 셸 너비 기준점입니다. 기본값은 `768`이며 `0`은 오버레이 모드를 끕니다. |
| `items` | *Array* | 위에서 아래로 렌더링되는 내장 및 사용자 지정 항목입니다. |

### Sidebar 항목

| 항목 | 설명 |
| --- | --- |
| `"minicalendar"` | 연결된 미니 캘린더를 렌더링합니다. 이벤트가 있는 날짜를 표시하려면 항목 객체에 `mark_events: true`를 설정하세요. |
| `"event_groups"` | `scheduler.config.event_groups`가 활성화되면 이벤트 그룹 필터 목록을 렌더링합니다. 항목 객체는 `label`과 `select_all`을 지원합니다. |
| `{ id, css }` | 빈 사용자 지정 컨테이너를 만듭니다. `css`는 클래스를 추가하며 `onSidebarItemRender`로 내용을 채웁니다. |

## 사용자 지정 항목

사용자 지정 Sidebar 항목은 빈 컨테이너입니다. `onSidebarItemRender`에서 내용을 채우세요.

```js
scheduler.config.sidebar = { items: [{ id: "filters", css: "app-filters" }, "minicalendar"] };
scheduler.attachEvent("onSidebarItemRender", (id, node) => {
  if (id === "filters") node.innerHTML = "<strong>Filters</strong>";
});
```

런타임 상태에는 `scheduler.ext.sidebar.show()`, `hide()`, `toggle()`을 사용하세요. 이 호출은 `scheduler.config.sidebar.collapsed`를 변경하지 않습니다.

## 기존 마크업

초기화 호스트에 레거시 `.dhx_cal_*` 마크업이 있으면 Sidebar는 영구 마크업 폴백을 사용합니다. 셸이나 Sidebar는 렌더링되지 않습니다. 플러그인 레이아웃을 사용하려면 빈 호스트에서 초기화하세요.

[sidebar 설정](api/config/sidebar.md)과 [애플리케이션 레이아웃](guides/application-layout.md)을 참조하세요.
