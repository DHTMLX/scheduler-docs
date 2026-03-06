---
title: "이벤트 필터링"
sidebar_label: "이벤트 필터링"
---

# 이벤트 필터링

각 뷰(view)마다 해당 뷰에서 어떤 이벤트가 스케줄러에 표시되고, 어떤 이벤트가 숨겨질지 결정하는 필터링 함수를 정의할 수 있습니다.

~~~js
scheduler.filter_week = function(id, event){
    if(event.name == 'New event')
        return false; // 이벤트가 필터링되어(렌더링되지 않음) 숨겨집니다.
        //또는
        return true; // 이벤트가 렌더링되어 표시됩니다.
}
~~~

여기서 'week'는 뷰의 이름을 의미하며 (*'scheduler.filter_week'*에서 사용됨) 해당 뷰에 대한 필터링 함수를 지정합니다.

**filter_(viewName)** 함수는 두 개의 인자를 받습니다:

- **id** - 이벤트의 식별자
- **event** - 이벤트 객체 자체

또한, 다양한 뷰에 대해 서로 다른 필터링 함수를 지정하는 것도 가능합니다:

~~~js
scheduler.filter_day = scheduler.filter_week = function(id, event){
    //some_code
}
...
scheduler.filter_timeline = function(id, event){
    //some_other code
}

~~~


[Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)
