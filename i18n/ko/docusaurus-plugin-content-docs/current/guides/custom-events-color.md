---
title: "사용자 정의 이벤트의 색상"
sidebar_label: "사용자 정의 이벤트의 색상"
---

# 사용자 정의 이벤트의 색상

이벤트에 대한 사용자 정의 색상을 지정하는 방법은 총 세 가지가 있습니다:

1. [이벤트 객체의 속성에 색상 값을 설정하려면](guides/custom-events-color.md#specifying-colors-in-properties-of-the-event-object);
2. [이벤트에 추가 CSS 클래스(들)를 적용하려면](guides/custom-events-color.md#attaching-additional-css-classes-to-an-event);
3. [데이터에서 스타일을 생성하려면](guides/custom-events-color.md#loading-colors-with-data).

![custom_event_color](/img/custom_event_color.png)

## 이벤트 객체의 속성에서 색상 지정

이벤트에 대한 사용자 정의 색상을 지정하려면 데이터 객체에 2개의 추가 속성을 더하거나 두 속성 중 하나만 추가하면 됩니다:

- **textColor** - 이벤트의 글꼴 색상을 지정합니다;
- **color** - 이벤트의 배경 색상을 지정합니다.

![custom_color_model](/img/custom_color_model.png)

데이터 객체에서 이벤트의 색상을 설정하는 예:

~~~js
scheduler.parse([
   {id:1, start_date:"2027-05-21",end_date:"2027-05-25",text:"Task1", color:"red"},
   {id:2, start_date:"2027-06-02",end_date:"2027-06-05",text:"Task2", color:"blue"}
],"json");
...
scheduler.getEvent(1).color = "yellow";
scheduler.updateEvent(1);
~~~

참고로, 이들 속성은 특수한 속성입니다. 기본적으로 Scheduler는 이벤트에 해당 속성이 있는지 항상 확인하고, 있을 경우 이벤트의 컨테이너와 텍스트에 관련 값을 적용합니다. 그렇지 않으면 Scheduler는 이벤트에 대해 미리 정의된 색상을 사용합니다.

속성은 임의의 유효한 CSS 색상 값이 될 수 있으며, 예를 들어 아래의 표기법 모두가 유효합니다:

~~~js
ev.color = "#FF0000";
ev.color = "red";
ev.color = "rgb(255,0,0)";
~~~


## 이벤트에 추가 CSS 클래스 적용하기

이벤트에 색상을 지정하는 두 번째 방법은 추가 CSS 클래스(들)를 이벤트에 적용하는 것입니다.

### 기법

이벤트에 CSS 클래스를 적용하려면 [event_class](api/template/event_class.md) 템플릿을 사용합니다.

템플릿의 기본 구현은 다음과 같습니다:

~~~js
scheduler.templates.event_class = function(start, end, ev){
     return "";
}
~~~
*이 함수는 이벤트 클래스에 추가될 문자열을 반환합니다. 따라서 이벤트의 상태에 따라 서로 다른 클래스를 반환할 수 있습니다.*

[이벤트 색칠하기](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

### 예시
다음과 같이 매니저와 직원에게 서로 다른 색상의 이벤트를 할당하고 싶다고 가정해 봅시다: 매니저는 녹색, 직원은 주황색으로. 이 경우 두 가지를 수행합니다:

1. 모델에 추가 데이터 속성(예: 'type')을 추가합니다. 이 속성은 사용자의 유형을 저장합니다: 'manager' 또는 'employee'.

 ![extended_data_model](/img/extended_data_model.png)
2. 이 유형들에 대해 관련 CSS 클래스를 지정합니다. 예를 들어 'manager_event'와 'employee_event'로 명명합니다. 이러한 이름에 대한 CSS 정의는 다음과 같이 보일 것입니다:

[기본 CSS 클래스 재정의](Redefining the default CSS classes)

~~~html

    .manager_event {
        --dhx-scheduler-event-background: #009966;
        --dhx-scheduler-event-color: black;
    }

    .employee_event {
        --dhx-scheduler-event-background: #FF9933;
        --dhx-scheduler-event-color: black;
    }

~~~

Scheduler의 이전 버전(v6.0 이하)에서는 CSS 변수 사용이 불가능하며, 다음과 같은 스타일로 이벤트에 색상을 적용할 수 있습니다:

~~~html

    /*일간 또는 주간 보기의 이벤트*/
    .dhx_cal_event.manager_event div{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event.employee_event div{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /*월간 보기의 다중일 이벤트*/
    .dhx_cal_event_line.manager_event{
        background-color: #009966 !important;
        color: black !important;
    }
    .dhx_cal_event_line.employee_event{
        background-color: #FF9933 !important;
        color: black !important;
    }

    /*모듈 시간 고정 이벤트, 월간 보기*/
    .dhx_cal_event_clear.manager_event{
        color: black !important;
    }
    .dhx_cal_event_clear.employee_event{
        color: black !important;
    }

~~~
3. 그리고 마지막으로 [event_class](api/template/event_class.md) 템플릿을 재정의합니다.

[Applying additional CSS classes to events:](Applying additional CSS classes to events:)
~~~js
scheduler.templates.event_class = function (start, end, event) {
    if (event.type == 'manager') return "manager_event";
    return "employee_event"; 
};
~~~

[Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)

[템플릿으로 이벤트 스타일링](https://docs.dhtmlx.com/scheduler/samples/02_customization/06_templates.html)


## 데이터로 색상 로딩

색상이 백엔드에서 제공된다면 스타일시트를 생성하는 대신 이벤트 그룹을 사용하세요. 그룹 컬렉션은 사람, 단계, 리소스 또는 기타 이벤트 범주를 나타낼 수 있습니다.

~~~js
[
    {"key":1, "label":"John", "color":"#03A9F4", "textColor":"#FFF"},
    {"key":2, "label":"Mike", "color":"#f57730", "textColor":"#FFF"}
]
~~~

컬렉션과 이벤트 속성을 한 번 설정하세요. JSON으로 받은 컬렉션은 `parse()`에 전달하고 이후 업데이트에는 `updateCollection()`을 사용합니다.

~~~js
scheduler.config.event_groups = { list: "people", property: "owner_id" };
scheduler.init("scheduler_here");
scheduler.parse({
    data: [{ id: 1, text: "Task", start_date: "2027-05-21 09:00", end_date: "2027-05-21 10:00", owner_id: 1 }],
    collections: { people: [{ key: 1, label: "John", color: "#03A9F4", textColor: "#FFF" }] }
});

// Replaces colors and labels from a later server response.
scheduler.updateCollection("people", [
    { key: 1, label: "John", color: "#1565c0", textColor: "#fff" }
]);
~~~

Scheduler는 배경색과 텍스트 색상을 독립적으로 결정합니다. 이벤트의 `color` 또는 `textColor`, 관련 이벤트 변수를 설정하는 CSS 규칙, 이벤트 그룹 색상, 활성 테마 순서로 우선합니다. 스타일이 컬렉션 값 외의 요소에도 의존한다면 `event_class` CSS 규칙을 유지하세요.