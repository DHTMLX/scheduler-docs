---
title: "커스텀 이벤트 내용"
sidebar_label: "커스텀 이벤트 내용"
---

# 커스텀 이벤트 내용

이벤트의 내용을 원하는 대로 구성하고 표시할 데이터를 결정하려면 템플릿을 사용하면 됩니다. 각 뷰는 서로 다른 템플릿에 의존하며, 특정 뷰에서 어떤 템플릿을 사용하는지 확인하려면 ["레이블, 날짜, 스타일 포매팅"](guides/templates.md) 문서를 참고하세요.

이 문서에서는 가장 많이 사용되는 뷰인 ["Day View"](views/day.md)와 ["주간 보기"](views/week.md)의 템플릿을 수정하는 방법에 집중합니다.

이 뷰들은 이벤트 텍스트를 커스터마이즈하기 위해 두 가지 템플릿을 사용합니다:

- [event_header](api/template/event_header.md) - 이벤트 헤더를 정의합니다.
- [event_text](api/template/event_text.md) - 이벤트 텍스트를 정의합니다.

추가로, 여러 날에 걸친 이벤트의 텍스트를 설정하는 [event_bar_text](api/template/event_bar_text.md) 템플릿이 있습니다. 이 템플릿은 ["Month View"](views/month.md)와 ["타임라인 뷰"](views/timeline.md)에서 사용됩니다.

:::note
템플릿을 재정의할 때는 [onTemplatesReady](api/event/ontemplatesready.md) 이벤트의 핸들러 함수 안에서 정의하는 것이 권장됩니다. 이렇게 하면 기본 템플릿에 의해 덮어써지는 것을 방지할 수 있습니다.
:::

## 이벤트 헤더 커스터마이즈하기

이벤트 헤더는 [event_header](api/template/event_header.md) 템플릿으로 제어됩니다.

~~~js
// 기본 정의
scheduler.templates.event_header = function(start,end,ev){
    return scheduler.templates.event_date(start)+" - "+
    scheduler.templates.event_date(end);
};
~~~

*예를 들어, 데이터 객체에 이벤트의 중요 여부를 표시하는 불리언 속성 **important**가 있다고 가정해봅니다. 중요한 이벤트를 강조하기 위해 빨간 체크 아이콘을 추가하고, 이벤트 기간을 주황색으로 표시하고 싶다고 할 때 아래와 같이 할 수 있습니다.*


![custom_event_header](/img/custom_event_header.png)

아래와 같은 코드로 구현할 수 있습니다:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_header = function(start,end,ev){
        if (event.important == true){
            return ("![red_check](/img/red_check.png) <b>"+
                scheduler.templates.event_date(start)+" - "+
        } else {
            return(scheduler.templates.event_date(start)+" - "+
            scheduler.templates.event_date(end))
        }
    };
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~

## 이벤트 텍스트 커스터마이즈하기

이벤트 텍스트는 [event_text](api/template/event_text.md) 템플릿에 의해 설정됩니다.

~~~js
// 기본 정의
scheduler.templates.event_text = function(start,end,ev){
    return ev.text;
};
~~~

*예를 들어, 데이터 객체에 이벤트가 열리는 장소를 나타내는 **location** 속성이 추가되어 있다고 가정해봅니다. 이벤트 박스 안에 이벤트 텍스트와 함께 장소도 표시하고 싶을 때는 아래와 같이 할 수 있습니다.*


![custom_event_text](/img/custom_event_text.png)

아래와 같이 구현할 수 있습니다:

~~~js
scheduler.attachEvent("onTemplatesReady", function(){
    scheduler.templates.event_text="function(start,end,event){"
        return "<b>" + event.text + "</b>

<i>" + event.location + "</i>";
    }
}); 
...
scheduler.init('scheduler_here', new Date(2019, 6, 5), "week");
~~~
