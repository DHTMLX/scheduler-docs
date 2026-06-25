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

참고로 헤더/네비게이션 바의 높이는 여전히 [`scheduler.xy.nav_height`](api/other/xy.md#illustration-images) 옵션에 의해 제어됩니다.

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


지원되는 값은 다음과 같습니다:

- `{rows: Array, css: string}` - 다중 행 헤더의 컨테이너
- `{cols: Array, css: string}` - 다중 행 헤더의 단일 행
- `"prev"`, `"next"`, `"today"` - 날짜 탐색 버튼
- `"date"` - 날짜 레이블
- `"day"`, `"week"`, `"month"`, 등 - 뷰 탭
- `"spacer"` - 전체 남는 공간을 차지하는 투명 요소로, 헤더의 오른쪽에 다른 요소를 밀어 넣는 데 사용할 수 있습니다
- `{html: string, click: function, css: string}` - 헤더에 커스텀 버튼이나 아이콘을 주입하기 위한 객체
- `"minicalendar"` - [Mini Calendar](guides/minicalendar.md) 토글

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