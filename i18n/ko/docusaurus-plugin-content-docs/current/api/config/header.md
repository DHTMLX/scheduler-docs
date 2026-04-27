---
sidebar_label: "header"
title: "header config"
description: "스케줄러 헤더(네비게이션 패널) 레이아웃을 설정합니다."
---

# header

### Description

@short: 스케줄러 헤더(네비게이션 패널) 레이아웃을 설정합니다.

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

스케줄러가 이 설정으로 초기화되면, 스케줄러 컨테이너 내부의 기존 HTML은 생성된 마크업으로 대체됩니다.

이 설정은 단순한 요소 배열일 수도 있고, 더 복잡한 레이아웃을 정의하기 위한 중첩 구조일 수도 있습니다.

헤더/네비게이션 바의 높이는 여전히 [scheduler.xy.nav_height](api/other/xy.md) 옵션에 의해 제어된다는 점을 유념하세요.

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
<div id="scheduler_here"></div>
~~~


지원되는 값은 다음과 같습니다:

 - **\{rows: Array, css:string\}** - 여러 행을 포함하는 헤더 컨테이너
 - **\{cols: Array, css:string\}** - 다중 행 헤더 내의 단일 행
 - **"prev","next","today"** - 날짜 네비게이션을 위한 버튼
 - **"date"** - 현재 날짜를 표시하는 레이블
 - **"day", "week", "month" 등** - 뷰 전환을 위한 탭
 - **"spacer"** - 가용 공간을 채우는 투명 요소로, 오른쪽 정렬에 유용
 - **\{html: string, click: function, css: string\}** - 헤더에 커스텀 버튼이나 아이콘을 추가하기 위한 객체
 - **"minicalendar"** - [Mini Calendar](guides/minicalendar.md)를 토글하는 버튼

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    {html:"click me!", click:function(){alert("done!") }},
    "date",
    "prev",
    "today",
    "next"
];
scheduler.init("scheduler_here");
~~~

#### Mini Calendar 설정:

"minicalendar" 옵션은 다음과 같은 클릭 핸들러를 가진 미니 캘린더 토글 버튼을 추가합니다:

~~~js
function showCalendar () {
    if (scheduler.isCalendarVisible()) {
        scheduler.destroyCalendar();
    } else {
        scheduler.renderCalendar({
            position: this,
            date: scheduler.getState().date,
            navigation: true,
            handler: function (date, calendar) {
                scheduler.setCurrentView(date);
                scheduler.destroyCalendar();
            }
        });
    }
};
~~~

다른 매개변수로 미니 캘린더 동작을 커스터마이즈하려면, 다음과 같이 minicalendar 버튼에 대한 자체 클릭 핸들러를 제공하세요:

~~~js
scheduler.config.header = [
    "day",
    "week",
    "month",
    {view: "minicalendar", click: function () {
        if (scheduler.isCalendarVisible()) {
            scheduler.destroyCalendar();
        } else {
            scheduler.renderCalendar({
                position: this,
                date: scheduler.getState().date,
                navigation: true,
                handler: function (date, calendar) {
                    scheduler.setCurrentView(date);
                    scheduler.destroyCalendar();
                }
            });
        }
     
}},
    "date",
    "prev",
    "today",
    "next"
];
~~~

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
- ["dhtmlxScheduler를 순수 JS/HTML에서 사용하기"](guides/initialization.md)
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
