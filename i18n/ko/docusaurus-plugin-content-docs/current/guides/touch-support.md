---
title: "모바일 반응형 Scheduler"
sidebar_label: "모바일 반응형 Scheduler"
description: "터치 장치와 반응형 Toolbar 및 Sidebar 레이아웃을 위한 Scheduler v8 설정"
---

# 모바일 반응형 Scheduler

Scheduler는 iOS, Android, Windows 태블릿, 터치스크린 모니터 및 휴대폰의 터치 입력을 지원합니다. 모든 뷰에서 터치 제스처를 사용할 수 있습니다. 작은 화면에서는 캘린더뿐 아니라 애플리케이션 레이아웃도 설정하세요.

:::note
이 가이드는 v8.0 Toolbar 및 Sidebar 레이아웃을 설명합니다. 레거시 탐색 모음을 유지하는 애플리케이션은 [v7.2 반응형 헤더 방식](guides/touch-support-legacy.md)을 계속 사용할 수 있습니다.
:::

터치 중심 애플리케이션에서는:

- `<meta name="viewport" content="width=device-width, initial-scale=1">`를 포함하고,
- [Material 스킨](guides/skins.md#material-skin) 또는 충분히 큰 컨트롤의 테마를 사용하며,
- 간결한 이벤트 편집기가 필요하면 [Quick Info](guides/quick-info.md) 플러그인을 활성화하고,
- 내장 lightbox가 좁은 화면에 맞아야 하면 `responsive_lightbox`를 활성화하세요.

## 반응형 Toolbar

Toolbar 플러그인을 활성화하고 `scheduler.config.header`의 전체 및 간결한 버전을 제공하세요. `onLayoutSizeChange`로 선택합니다.

~~~js
const compactHeader = {
    rows: [
        { cols: ["prev", "date", "next"] },
        { cols: ["today", { id: "views", comp: "menu" }] }
    ]
};

const fullHeader = [
    "toggle_sidebar", "add_event", "spacer",
    "prev", "date", "next", "spacer", "today", "views"
];

scheduler.plugins({ toolbar: true, sidebar: true });

scheduler.attachEvent("onLayoutSizeChange", ({ width }) => {
    scheduler.config.header = width < 700 ? compactHeader : fullHeader;
});

scheduler.init("scheduler_here", new Date(), "week");
~~~

이 이벤트는 `scheduler.init()`에 전달된 요소인 레이아웃 셸 너비를 보고합니다. Scheduler가 페이지 일부만 차지할 수 있으므로 `window.innerWidth` 대신 이 값을 사용하세요. 캘린더 높이로 헤더를 선택하지 마세요. Toolbar 행 수가 바뀌면 높이가 변경되어 크기 변경 루프가 생길 수 있습니다.

Toolbar는 `onLayoutSizeChange` 후 `config.header`를 다시 읽어 같은 렌더링에서 선택한 구조를 사용합니다. 구조가 같으면 기존 컨트롤과 프레임워크 컴포넌트를 유지합니다.

`scheduler.xy.nav_height = 0`은 탐색 모음을 숨깁니다. 양수 값은 높이를 설정하지 않습니다. 고정 높이는 양수 `config.header.height` 또는 `--dhx-scheduler-toolbar-height` CSS 변수를 사용하세요.

## 반응형 Sidebar

Sidebar는 Toolbar와 같은 셸 너비를 사용합니다.

~~~js
scheduler.config.sidebar = {
    items: ["minicalendar", "event_groups"],
    position: "left",
    width: 260,
    collapsed: false,
    overlay_width: 768
};
~~~

`overlay_width` 아래에서 내장 또는 독립형 Toolbar에 표시되는 `toggle_sidebar`가 있으면 Sidebar는 닫힌 오버레이가 됩니다. 없으면 접근 불가 상태를 방지하기 위해 도킹 상태를 유지합니다. `scheduler.ext.sidebar.show()`, `hide()` 같은 런타임 호출은 `config.sidebar.collapsed`를 다시 쓰지 않고 표시 상태만 바꿉니다.

전체 설정은 [애플리케이션 레이아웃](guides/application-layout.md), [Toolbar](guides/toolbar.md), [Sidebar](guides/sidebar.md)를 참조하세요.

## 컨테이너 자동 크기 조정

스크롤 부모 내부에서 `container_autoresize`를 사용하면 세로 스크롤바 공간을 확보하세요. 그렇지 않으면 반응형 중단점에서 스크롤바가 셸 너비를 반복해서 변경할 수 있습니다.

~~~css
.scheduler-scroll-container {
    overflow: auto;
    scrollbar-gutter: stable;
}
~~~

Toolbar 또는 Sidebar 셸에서는 `container_autoresize`가 기록한 높이가 `onSchedulerResize`를 발생시키지 않습니다. 애플리케이션 레이아웃 판단에는 `onLayoutSizeChange`를 사용하세요.

## 반응형 lightbox

내장 lightbox의 반응형 스타일을 활성화합니다.

~~~js
scheduler.config.responsive_lightbox = true;
~~~

좁은 화면에서 lightbox는 `dhx_cal_light_responsive` 클래스를 받습니다. 애플리케이션별 반응형 스타일에 사용하세요.

## 터치 설정 옵션

- [touch](api/config/touch.md)는 터치 지원을 켜거나 끕니다.
- [touch_drag](api/config/touch_drag.md)는 길게 누르기와 스크롤을 구분하는 지연을 설정합니다.
- [touch_swipe_dates](api/config/touch_swipe_dates.md)는 가로 스와이프 날짜 탐색을 활성화합니다.
- [touch_tip](api/config/touch_tip.md)은 터치 안내를 제어합니다.
- [touch_tooltip](api/config/touch_tooltip.md)은 터치 툴팁을 제어합니다.
- [responsive_lightbox](api/config/responsive_lightbox.md)는 반응형 lightbox 스타일을 활성화합니다.

## Scheduler의 터치 제스처 {#touch-gestures-in-the-scheduler}

- **두 번 탭**은 더블클릭처럼 이벤트를 열거나 만듭니다.
- **길게 탭하고 드래그**하면 이벤트를 이동하거나 빈 시간대에 만듭니다.
- **스와이프**는 `touch_swipe_dates`가 활성화되면 이전/다음 날짜 범위로 이동합니다.

Toolbar가 활성화되면 가로 스와이프는 `prev` 및 `next`와 같은 취소 가능한 `onToolbarItemClick` 작업 경로를 사용합니다.

## Quick Info 확장 {#quick-info-extension}

[Quick Info](guides/quick-info.md) 플러그인은 터치 친화적인 이벤트 요약 및 작업 버튼을 제공합니다. 초기화 전에 활성화하세요.

~~~js
scheduler.plugins({ quick_info: true });
~~~

Quick Info는 `quick_info_content`, `quick_info_date`, `quick_info_title` 템플릿을 사용합니다. 런타임 메서드와 이벤트에는 `showQuickInfo`, `hideQuickInfo`, `onQuickInfo`, `onAfterQuickInfo`가 있습니다.

[반응형 애플리케이션 레이아웃 샘플](https://docs.dhtmlx.com/scheduler/samples/16_layout/03_layout.html)