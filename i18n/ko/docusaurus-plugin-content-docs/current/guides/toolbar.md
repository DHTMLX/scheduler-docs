---
title: Toolbar
sidebar_label: Toolbar
---

# Toolbar

Toolbar 플러그인은 Scheduler UI 키트로 캘린더 위에 `scheduler.config.header`를 렌더링합니다. `init()` 전에 활성화하세요.

~~~js
scheduler.plugins({ toolbar: true, minical: true });
scheduler.config.header = ["prev", "date", "next", "today", { id: "views", comp: "segmented" }];
scheduler.init("scheduler_here");
~~~

`header`가 없으면 Toolbar는 설정을 변경하지 않고 `add_event, spacer, prev, date, next, spacer, today, views`를 사용합니다. Sidebar 플러그인이 활성화되어 있으면 `toggle_sidebar`가 첫 기본 항목입니다. 외부 Toolbar를 숨기려면 `header`를 `false`로 설정하세요.

일반 헤더 문자열은 레거시 의미(`prev`, `next`, `today`, `date`, 뷰 이름, `minicalendar`, `button`, `spacer`)를 유지합니다. 새 내장 항목은 `views`, `add_event`, `toggle_sidebar`이며 `"|"`는 구분선을 렌더링합니다. 새 항목 객체는 빈 `{ id, comp: "container" }` 호스트를 포함해 `{ id, comp, label, ... }`를 사용합니다. 문자열은 레거시 이름, 기존 뷰, Toolbar 내장 항목, 뷰 탭 순서로 해석됩니다. 따라서 `views`라는 사용자 지정 뷰는 여전히 뷰 탭입니다.

## Toolbar 설정

Toolbar는 `scheduler.config.header`를 사용하며 별도 `scheduler.config.toolbar` 객체는 없습니다.

| 매개변수 | 타입 | 설명 |
| --- | --- | --- |
| `toolbar` | *boolean* | `init()` 전에 Toolbar를 활성화하는 `scheduler.plugins()` 옵션입니다. |
| `header` | *Array \| object \| false* | Toolbar 항목 목록 또는 중첩된 `rows`/`cols` 레이아웃입니다. `false`는 외부 Toolbar를 숨깁니다. |
| `header.height` | *number* | 픽셀 단위의 양수 고정 Toolbar 높이입니다. 없으면 항목이 줄바꿈될 때 Toolbar가 커집니다. |
| `rows` / `cols` | *Array* | 여러 행 또는 그룹 Toolbar용 중첩 레이아웃 그룹입니다. |
| `align` | *"left" \| "right"* | `rows` 또는 `cols` 그룹 항목의 정렬입니다. |

### Toolbar 항목 속성

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| `id` | *string \| number* | 항목 ID이며 `views`, `add_event`, `toggle_sidebar` 같은 내장 동작도 선택합니다. |
| `comp` | *string* | UI 키트 컨트롤: `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer`, `container`. |
| `label` / `icon` / `tooltip` | *string* | 표시 레이블, 아이콘 CSS 클래스, 접근 가능한 호버 레이블입니다. |
| `options` / `items` | *Array* | `combo`/`segmented` 옵션 또는 `menu` 항목입니다. |
| `value` / `placeholder` | *any \| string* | 값 컨트롤의 선택값 또는 자리 표시자입니다. |
| `css` / `width` / `height` / `align` | *string \| number* | 모양, 크기 및 항목 정렬 재정의입니다. |
| `disabled` / `hidden` | *boolean* | 항목을 비활성화하거나 숨깁니다. |

레거시 `{ html, click, css }` 항목도 지원합니다. `click`은 `onToolbarItemClick`보다 먼저 항목 노드를 `this`로 사용해 실행되며 반환값은 작업을 취소하지 않습니다. 레거시 `view`, `html`, `click`을 `id`와 결합하지 마세요. Toolbar는 레거시 항목을 렌더링하고 새 형식 속성이 무시된다는 경고를 표시합니다.

## 사용자 지정 콘텐츠 및 런타임 변경

애플리케이션이 콘텐츠를 소유할 때 컨테이너를 사용하세요.

~~~js
scheduler.config.header = ["prev", { id: "search", comp: "container" }];
scheduler.attachEvent("onToolbarItemRender", (id, node) => {
  if (id === "search") node.appendChild(document.createElement("input"));
});
~~~

[`scheduler.ext.toolbar`](api/other/toolbar.md)는 `setItems`, `updateItem`, `getItem`, `getValue`, `setValue`, `show`, `hide`, `refresh`, `getItemNode`, `getDefaultItems`를 제공합니다. 반복 ID는 마지막 인수에 깊이 우선 시각 순서의 0부터 시작하는 occurrence를 전달합니다. `1`과 `"1"`은 같은 ID입니다. 런타임 패치는 동등하거나 비구조적인 헤더 변경 후 유지되고 구조적인 선언 변경 시 제거됩니다. `setItems()` 런타임 구조는 다음 선언적 헤더 변경 시 제거됩니다.

[`onToolbarItemClick`](api/event/ontoolbaritemclick.md)과 [`onToolbarItemChange`](api/event/ontoolbaritemchange.md)는 취소할 수 있습니다. 레거시 `click`이 먼저 실행되며 Toolbar 이벤트에서 `false`를 반환하면 Scheduler 작업을 막습니다.

## 레이아웃, 키보드 및 수명 주기

`getLayoutSize()`는 정수 셸 `clientWidth`/`clientHeight`를 반환하고 분리되거나 숨겨진 셸에는 `null`을 반환합니다. `onLayoutSizeChange(size)`는 헤더 조정 전에 발생하므로 같은 렌더링에서 반응형 헤더를 선택할 수 있습니다. `header.height`를 양수 픽셀로 설정하거나 `--dhx-scheduler-toolbar-height`를 사용하세요. 헤더가 양수 높이를 제공하지 않으면 `xy.nav_height = 0`이 Toolbar를 숨깁니다.

각 Toolbar 실행은 하나의 탭 정지점입니다. 컨트롤은 화살표, Home, End 키를 처리하며 Ctrl+Left, Ctrl+Right, Alt+1~Alt+9 및 가로 스와이프는 같은 Toolbar 작업/이벤트 경로를 사용합니다. 입력과 사용자 지정 컨테이너는 편집 키를 유지합니다. 외부 영역은 `.dhx_scheduler_toolbar`, `data-item-id`, `data-item-occurrence`로 스타일링하며 표시되는 `dhx_cal_*` 컨트롤은 의도적으로 노출하지 않습니다.

Toolbar 모드는 `init()` 호스트를 `.dhx_scheduler_shell`로 만들고 `_obj`, `$container`, `$root`는 내부 캘린더를 가리킵니다. 완전한 레거시 마크업이 있고 초기 헤더가 없거나 `false`이면 Scheduler는 영구 마크업 폴백을 사용합니다. 셸은 생성되지 않고 변경 API는 동작하지 않습니다. 내보내기와 제거 시 Toolbar 리소스는 Scheduler 인스턴스별로 격리됩니다.

래퍼에서는 React의 `plugins={{ toolbar: true }}`, Vue의 `:plugins="{ toolbar: true }"`, Angular의 `[plugins]="{ toolbar: true }"`처럼 Scheduler 플러그인 prop에서 같은 플러그인을 활성화하세요.

[header](api/config/header.md), [초기화](guides/initialization.md), [키보드 탐색](guides/keyboard-navigation.md), [미니 캘린더](guides/minicalendar.md)도 참조하세요.