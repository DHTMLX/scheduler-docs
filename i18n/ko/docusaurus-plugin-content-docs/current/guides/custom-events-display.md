---
title: "커스텀 이벤트 박스"
sidebar_label: "커스텀 이벤트 박스"
---

# 커스텀 이벤트 박스 

dhtmlxScheduler를 사용하면 이벤트가 표시되는 방식을 사용자 정의할 수 있습니다.

:::note
이 기능은 ["Day View"](views/day.md), ["주간 보기"](views/week.md), ["Units View"](views/units.md)에서만 작동합니다.
:::

## 기술

이벤트를 사용자 정의하려면 [renderEvent](api/method/renderevent.md) 메서드를 사용할 수 있습니다:

~~~js
scheduler.renderEvent = function(container, ev) {
    // 사용자 정의 코드 작성
}
~~~

- **_container_** - 이벤트의 컨테이너 엘리먼트
- **_ev_** - 이벤트 객체 자체


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 중요 팁

- _true_를 반환하면 사용자 정의 렌더링이 적용되고, _false_를 반환하면 기본 렌더링이 사용됩니다.
- 일부 CSS 클래스는 특별한 역할을 하며, 엘리먼트의 className에서 첫 번째로 지정되어야 합니다:
  - **_dhx_event_move_** - 엘리먼트를 드래그 가능하게 만듭니다(일반적으로 이벤트 헤더).
  - **_dhx_event_resize_** - 엘리먼트 드래그로 이벤트 기간을 조절할 수 있게 합니다.

~~~js
var html = "<div class='dhx_event_move my_event_move' "
~~~

## 예제

아래는 커스텀 이벤트 표시 예시입니다:

![custom_event_box](/img/custom_event_box.png)

~~~js title="이벤트 박스의 커스텀 모양 정의하기"
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width; // 예: "105px"

    // 이동 핸들 부분
    var html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // 이벤트 내용 컨테이너
    html += "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    // 두 가지 옵션: 짧은 이벤트는 시작 날짜만, 긴 이벤트는 시작+종료 표시
    if ((ev.end_date - ev.start_date)/60000 > 40) { // 이벤트가 40분 이상일 경우
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // 이벤트 텍스트 표시
    html += "<span>" + scheduler.templates.event_text(ev.start_date, ev.end_date, ev) +
    "</span></div>";

    // 리사이즈 핸들 부분
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; // 필수: true는 커스텀 렌더링 사용, false는 기본 렌더링
};
~~~

관련 CSS는 다음과 같습니다:

~~~html
<style type="text/css" >
    /* 전체 컨테이너의 배경 및 테두리 */
    .my_event {
        background: #add8e6;
        color: black;
        border: 1px solid #778899;
        overflow: hidden;
        display: block;
    }

    .dhx_cal_event_clear.my_event {
        height: 22px;
    }

    /* 이벤트 내용 스타일 */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* 이벤트 날짜 스타일 */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* 리사이즈 핸들 */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* 이동 핸들 */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

또한, 고정 색상 대신 CSS 변수를 사용할 수도 있습니다:

~~~html
<style>
.my_event {
    --dhx-scheduler-event-background: #add8e6;
    --dhx-scheduler-event-color: black;
    --dhx-scheduler-event-border: 1px solid #778899;

    overflow: hidden;
    display: block;
}
</style>
~~~


[Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)
