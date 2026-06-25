---
title: "이벤트 필터링"
sidebar_label: "이벤트 필터링"
---

# 이벤트 필터링

지정된 각 뷰에 대해 Scheduler에서 표시할 이벤트와 표시되지 않을 이벤트를 정의하는 필터링 함수를 설정할 수 있습니다.

~~~js
scheduler.filter_week = (id, event) => {
    if (event.name === 'New event') {
        return false; // 이벤트가 필터링되어(렌더링되지 않음) 숨겨집니다.
    }

    return true; // 이벤트가 렌더링되어 표시됩니다.
};
~~~

여기서, `"week"`는 `scheduler.filter_week`에서 뷰의 이름입니다.

`filter_(viewName)` 메서드는 두 매개변수를 받습니다:

- `id` - 이벤트의 ID
- `event` - 이벤트 객체

다른 뷰에 대해 서로 다른 필터링 함수를 설정할 수 있다는 점을 기억하세요:

~~~js
scheduler.filter_day = scheduler.filter_week = (id, event) => {
    // some code
};
...
scheduler.filter_timeline = (id, event) => {
    // some other code
};

~~~

### 관련 샘플
- [이벤트 필터링](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)