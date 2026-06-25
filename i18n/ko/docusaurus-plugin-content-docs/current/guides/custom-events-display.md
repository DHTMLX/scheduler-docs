--- 
title: "사용자 정의 이벤트 박스"
sidebar_label: "사용자 정의 이벤트 박스"
---

# 사용자 정의 이벤트 박스

dhtmlxScheduler는 이벤트에 대해 사용자 정의 표시를 정의할 수 있는 기능을 제공합니다.

:::note
다음 뷰에 한해 적용됩니다: [일간 보기](views/day.md), [주간 보기](views/week.md) 및 [단위 보기](views/units.md)
:::

## 기법

이벤트의 사용자 정의는 [renderEvent](api/method/renderevent.md) 메서드를 사용하여 달성됩니다:

~~~js
scheduler.renderEvent = function(container, ev) {
    // 당신의 커스터마이징 코드
}
~~~

- **_container_** - 이벤트 컨테이너
- **_ev_** - 이벤트 객체


[커스텀 이벤트 박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)


## 중요한 팁

- true를 반환하면 사용자 정의 로직이 적용되고, false를 반환하면 기본 로직이 적용됩니다.
- 일부 CSS 클래스는 특별한 용도로 사용됩니다(요소의 className에서 먼저 위치해야 합니다):
  - **_dhx_event_move_** - 이 스타일이 적용된 요소는 드래그할 수 있습니다(보통 이벤트 머리글임).
  - **_dhx_event_resize_** - 이 스타일의 요소를 드래그하면 이벤트의 지속 시간이 변경됩니다.

~~~js
const html = "<div class='dhx_event_move my_event_move' "
~~~

## 예시

다음은 커스텀 외관의 예시입니다:

![custom_event_box](/img/custom_event_box.png)

[이벤트 상자의 사용자 정의 모양 지정](Specifying a custom look for the event's box)
~~~js
scheduler.templates.event_class = function(start, end, event) {
    return "my_event";
};

scheduler.renderEvent = function(container, ev) {
    const container_width = container.style.width; // 예: "105px"

    // 이동 섹션
    let html = "<div class='dhx_event_move my_event_move' style='width: " + 
    container_width + "'></div>";

    // 이벤트 내용의 컨테이너
    html+= "<div class='my_event_body'>";
    html += "<span class='event_date'>";
    //두 가지 옵션 here: 짧은 이벤트의 시작 날짜만 표시하거나 긴 이벤트의 경우 시작+종료를 표시
    if ((ev.end_date - ev.start_date)/60000>40){//이벤트가 40분을 넘으면
        html += scheduler.templates.event_header(ev.start_date, ev.end_date, ev);
        html += "</span>

";
    } else {
        html += scheduler.templates.event_date(ev.start_date) + "</span>";
    }
    // 이벤트의 텍스트 표시
    html += "<span>" + scheduler.templates.event_text(ev.start_date,ev.end_date,ev)+
    "</span>" + "</div>";

    // 크기 조정 섹션
    html += "<div class='dhx_event_resize my_event_resize' style='width: " +
    container_width + "'></div>";

    container.innerHTML = html;
    return true; //필수, true - 커스텀 폼 표시, false - 기본 폼
};
~~~

관련 CSS는 다음과 같습니다:

~~~html
<style type="text/css" >
    /* 전체 컨테이너와 그 경계선의 배경색 */
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

    /* 이벤트 내용의 스타일 */
    .dhx_cal_event.my_event .my_event_body {
        padding-top: 3px;
        padding-left: 5px;
    }
    /* 이벤트 날짜 정보 */
    .my_event .event_date {
        font-weight: bold;
        padding-right: 5px;
    }
    /* 이벤트 크기 조정 섹션 */
    .my_event_resize {
        height: 3px;
        position: absolute;
        bottom: -1px;
    }
    /* 이벤트 이동 섹션 */
    .my_event_move {
        position: absolute;
        top: 0;
        height: 10px;
        cursor: pointer;
    }
</style>
~~~

다음과 같이 고정 색상 값 대신 CSS 변수를 사용할 수도 있습니다:

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

[커스텀 이벤트 박스](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)