---
title: "이벤트 객체 작업"
sidebar_label: "이벤트 객체 작업"
---

# 이벤트 객체 작업

## 이벤트 객체 가져오기

이벤트 객체를 가져오려면 [getEvent](api/method/getevent.md) 메서드를 사용하세요:

~~~js
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
... 
var eventObj = scheduler.getEvent(1);
//->{id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"}
~~~

## 지정된 기간 내의 이벤트 가져오기

특정 기간 동안 발생하는 이벤트 목록을 얻으려면 [getEvents](api/method/getevents.md) 메서드를 사용하세요:

~~~js
var evs = scheduler.getEvents(new Date(2019,1,10),new Date(2019,2,10)); 
//여기서 evs는 이벤트 객체의 배열입니다.
~~~

## 스케줄러의 모든 이벤트 가져오기

스케줄러에 현재 로드된 모든 이벤트를 가져오려면, 아래와 같이 [getEvents](api/method/getevents.md) 메서드를 파라미터 없이 호출하세요:

~~~js
var evs = scheduler.getEvents();
// 모든 이벤트를 객체 배열로 반환합니다.
~~~

## 현재 날짜부터 다음 이벤트 가져오기

~~~js
var evs = scheduler.getEvents(new Date(), new Date(9999,1,1));    
//evs - 모든 다가오는 이벤트 목록
evs.sort(function(a,b){ return (a.start_date > b.start_date ? 1 : -1); });
//evs[0] - 가장 가까운 다가오는 이벤트
~~~

## 이벤트의 id 가져오기

이벤트의 속성 값 중 하나를 기반으로 이벤트의 id를 찾으려면 다음과 같은 방법을 사용할 수 있습니다:

~~~js title="Getting the event's id by the event's text"
scheduler.parse([
   {id:1, start_date:"2019-05-13 6:00", end_date:"2019-05-13 8:00", text:"Event 1"},
   {id:2, start_date:"2019-06-09 6:00", end_date:"2019-06-09 8:00", text:"Event 2"}
]);
...

var evs = scheduler.getEvents(); //스케줄러에서 모든 이벤트를 가져옵니다.
for(var i="0;i<evs.length;" i++){  //목표 이벤트를 찾기 위해 모든 이벤트를 순회합니다.
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

이벤트의 대략적인 시간이 알려져 있다면, 성능 향상을 위해 이벤트를 가져올 때 범위를 제한하는 것이 좋습니다:

~~~js
var evs = scheduler.getEvents(new Date(2019,05,01),new Date(2019,05,10)); 
for(var i="0;i<evs.length;" i++){  
    if (evs[i].text == "Event 2") 
        var eventId = evs[i].id;// -> 2
};
~~~

## 이벤트의 id 변경하기

이벤트의 id를 업데이트하려면, [changeEventId](api/method/changeeventid.md) 메서드를 다음과 같이 사용할 수 있습니다:

~~~js
scheduler.changeEventId("ev15", "ev25"); //이벤트 id "ev15"를 "ev25"로 변경합니다.
~~~

## 라이트박스 옵션의 레이블을 이벤트 텍스트로 설정하기

기본적으로, Scheduler 이벤트의 텍스트는 라이트박스에서 매핑된 text 필드의 값으로 설정됩니다.

![default_event_text](/img/default_event_text.png)

기본 동작을 오버라이드하여, 콤보박스에서 선택한 옵션의 레이블을 이벤트의 텍스트로 사용할 수도 있습니다.

![option_event_text](/img/option_event_text.png)

이벤트 텍스트는 뷰 타입에 따라 [event_text](api/template/event_text.md) 또는 [event_bar_text](api/template/event_bar_text.md) 중 하나의 템플릿에 의해 결정됩니다. 이벤트에 텍스트가 추가되는 방식을 커스터마이즈하려면 적절한 템플릿을 재정의해야 합니다.

~~~js
scheduler.config.lightbox.sections = [
    { name:"type", height:21, inputWidth:400, map_to:"type", type:"select", 
        options:scheduler.serverList("options", [
            {key:1, label:"Simple"},
            {key:2, label:"Complex"},
            {key:3, label:"Unknown"}
        ]
    )},
    {name:"time", height:72, type:"time", map_to:"auto"}
];

scheduler.templates.event_text = scheduler.templates.event_bar_text = function(start, end, event){
    var options = scheduler.serverList("options");

    for(var i = 0; i < options.length; i++){
        if(options[i].key == event.type){
            return options[i].label;
        }
    }
    
    return "";
};
~~~

위 코드와 관련하여 참고해야 할 몇 가지 사항:

- [serverList](api/method/serverlist.md) 메서드는 콤보박스에 대한 옵션을 제공하며, 템플릿 내에서 이를 가져옵니다. 또한 커넥터를 통해 다른 데이터와 함께 옵션을 로드하거나 동적으로 업데이트하는 데 사용할 수 있습니다.

- 템플릿은 선택된 항목을 찾기 위해 선형 탐색을 수행합니다. 이벤트나 옵션이 많은 경우, 이 템플릿이 자주 호출되므로 성능에 영향을 줄 수 있습니다. 효율성을 높이려면 배열을 매번 순회하는 대신 해시를 생성하여 빠르게 조회하는 방법을 고려하세요.

- 클라이언트 측에서 옵션을 제대로 표시하려면 전체 옵션 목록이 미리 로드되어 있어야 합니다. 그렇지 않은 경우, 예를 들어 자동완성 검색 등에서 옵션을 동적으로 가져오는 경우에는 옵션을 수동으로 로드해야 합니다.
