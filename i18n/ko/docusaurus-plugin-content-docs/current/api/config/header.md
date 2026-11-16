---
sidebar_label: header
title: "header config"
description: "스케줄러 헤더(네비게이션 패널)에 대한 레이아웃 형태의 구성을 제공합니다."
---

# header

### Description

@short: 스케줄러 헤더(네비게이션 패널)에 대한 레이아웃 형태의 구성을 제공합니다.

@signature: header: any

### Example

~~~jsx
scheduler.config.header = [
    "day",
    "week",
    "month",
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

**Default value:** null

### Details

이 구성을 사용해 Scheduler를 초기화하면, 초기화 전에 스케줄러 컨테이너에 배치된 모든 HTML은 제거되고 생성된 마크업이 대신 삽입됩니다.

이 구성의 값은 요소의 일반 배열일 수도 있고, 복잡한 레이아웃을 설명하는 중첩 구조일 수도 있습니다.

`scheduler.xy.nav_height = 0`은 탐색 모음을 숨깁니다. 다른 양수 값은 높이를 설정하지 않습니다. Toolbar에서는 양수 `header.height` 또는 `--dhx-scheduler-toolbar-height`로 높이를 설정하세요.

~~~js
scheduler.xy.nav_height = 80;
scheduler.config.header = {
    rows: [
        {
            cols: [
                "prev",
                "date",
                "next",
            ]
        },
        {
            cols: [
                "day",
                "week",
                "month",
                "spacer",
                "today"
            ]
        }
    ]
};
scheduler.init("scheduler_here");
~~~


~~~html
<div id="scheduler_here" style="height:100vh;width:100vw"></div>
~~~


지원되는 레거시 값은 다음과 같습니다.

- `{ rows: Array, align?: "left" | "right" }` 및 `{ cols: Array, align?: "left" | "right" }` - 중첩 레이아웃 컨테이너이며 각 항목 실행은 Toolbar 그룹이 됩니다
- `"prev"`, `"next"`, `"today"` - 날짜 탐색 버튼
- `"date"` - 현재 날짜 레이블
- `"day"`, `"week"`, `"month"` 또는 등록된 뷰 이름 - 뷰 탭
- `"spacer"` - 뒤 항목을 오른쪽으로 미는 유연한 빈 항목
- `"minicalendar"`, `"button"`, `{ view: "..." }` - 해당 레거시 헤더 항목
- `{ html, click, css, width, height }` 또는 `id`, `view`, `rows`, `cols`가 없는 객체 - 레거시 사용자 지정 버튼. `html`은 콘텐츠를 제공하고 `click`은 항목 노드를 `this`로 사용합니다.

## Toolbar 항목 형식

다음 형식은 `toolbar: true`가 활성화된 경우에만 사용할 수 있습니다.

- `"views"` - 기본 segmented 뷰 선택기. 메뉴에는 `{ id: "views", comp: "menu" }`, 뷰 선택/정렬에는 `options`를 사용합니다.
- `"add_event"` - 새 이벤트 작업.
- `"toggle_sidebar"` - Sidebar 플러그인을 전환합니다.
- `"|"` - 시각적 구분선.
- `{ id, comp, label, ... }` - UI 키트 항목. 내장 ID는 해당 항목을 사용자 지정하고 다른 ID는 사용자 항목을 만듭니다.
- `{ id, comp: "container" }` - `onToolbarItemRender`에서 채우는 빈 호스트.

`comp`는 `button`, `toggle`, `menu`, `combo`, `segmented`, `text`, `stepper`, `datepicker`, `separator`, `spacer`, `container`일 수 있습니다. 사용자 항목은 `label`, `icon`, `tooltip`, `css`, `width`, `height`, `align`, `disabled`, `hidden`, `value`, `placeholder`, `options`, `items`, `config`를 사용할 수 있습니다. `options`는 `combo`와 `segmented`, `items`는 `menu`, `config`는 컴포넌트별 설정을 구성합니다.

`id`를 레거시 `view`, `html`, `click`과 결합하지 마세요. 레거시 항목으로 유지되고 Scheduler가 경고합니다. 사용자 Toolbar 작업에는 `onToolbarItemClick`과 `onToolbarItemChange`를 사용하세요.

### Toolbar 설정 예제

각 예제에서 초기화 전에 플러그인을 활성화합니다.

~~~js
scheduler.plugins({ toolbar: true, minical: true });
~~~

**1. segmented 뷰 선택기가 있는 표준 탐색**

~~~js
scheduler.config.header = [
    "add_event", "spacer", "prev", "date", "next", "today",
    { id: "views", comp: "segmented", options: ["day", "week", "month"] }
];
~~~

**2. 사용자 UI 키트 컨트롤과 구분선**

~~~js
scheduler.config.header = [
    "prev", "next", "|",
    { id: "range", comp: "combo", label: "Range", options: ["week", "month"] },
    { id: "search", comp: "text", placeholder: "Search events", width: 220 },
    "spacer",
    { id: "create", comp: "button", label: "Create", css: "my-create-button" }
];

scheduler.attachEvent("onToolbarItemChange", (id, value) => {
    if (id === "range") scheduler.setCurrentView(null, value);
    return true;
});
~~~

**3. 레거시 항목과 애플리케이션 콘텐츠가 있는 두 행 레이아웃**

~~~js
scheduler.config.header = {
    rows: [
        { cols: ["prev", "date", "next", { view: "minicalendar" }] },
        { cols: ["today", { id: "views", comp: "menu" }, "spacer", { id: "filters", comp: "container" }], align: "right" }
    ]
};

scheduler.attachEvent("onToolbarItemRender", (id, node) => {
    if (id !== "filters" || node.firstChild) return;
    const input = document.createElement("input");
    input.placeholder = "Filter";
    node.appendChild(input);
});
~~~
~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { html: "click me!", click: () => { alert("done!"); } },
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~


#### 미니 달력 설정:

`minicalendar` 값은 아래 클릭 핸들러를 가진 미니 달력 버튼을 표시합니다:

~~~js
function showCalendar() {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: (date, calendar) => {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

다른 매개변수를 사용하여 [`renderCalendar()`](api/method/rendercalendar.md)를 호출하려면 미니캘린더 버튼에 대한 자체 `onclick` 핸들러를 제공해야 합니다.

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    { view: "minicalendar", click: function() {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: (date, calendar) => {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }

    } },
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- [모바일 반응형 스케줄러](guides/touch-support.md)
- [Plain JS/HTML에서의 dhtmlxScheduler](guides/initialization.md)
- [미니 달력(날짜 선택기)](guides/minicalendar.md)