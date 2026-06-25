---
sidebar_label: updateView
title: "updateView 메서드"
description: "지정된 뷰와 날짜를 표시합니다(이벤트를 발생시키지 않습니다)"
---

# updateView

### Description

@short: 지정된 뷰와 날짜를 표시합니다(이벤트를 발생시키지 않습니다)

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (선택사항) *Date* - 설정할 날짜
- `view` - (선택사항) *string* - 뷰 이름

### Example

~~~jsx
// 현재 뷰와 날짜를 표시합니다. 아무 것도 변경하지 않고, 단지 새로고침합니다
scheduler.updateView();
// 현재 활성 뷰에서 2027-08-04를 표시합니다
scheduler.updateView(new Date(2027, 7, 4));
// 주간 뷰에서 2027-06-03을 표시합니다
scheduler.updateView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [필터링 이벤트](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- 매개변수 없이 호출되면 함수는 현재 보기를 단순히 새로 고침합니다.
- 기본 뷰의 이름은 'day', 'week', 'month' 입니다. 다른 뷰를 지정하려면 해당 뷰의 `name` 매개변수를 사용하세요.
- 이 메서드는 [`setCurrentView()`](api/method/setcurrentview.md)와 유사합니다. 유일한 차이점은 updateView()와 달리 [`setCurrentView()`](api/method/setcurrentview.md) 는 [`onBeforeViewChange`](api/event/onbeforeviewchange.md) 및 [`onViewChange`](api/event/onviewchange.md) 이벤트를 생성한다는 점입니다.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)