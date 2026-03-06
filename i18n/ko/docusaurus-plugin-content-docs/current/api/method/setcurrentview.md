---
sidebar_label: "setCurrentView"
title: "setCurrentView method"
description: "선택한 뷰와 날짜를 표시합니다."
---

# setCurrentView

### Description

@short: 선택한 뷰와 날짜를 표시합니다.

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 표시할 날짜
- `view` - (optional) *string* - 표시할 뷰의 이름

### Example

~~~jsx
// 변경 없이 현재 뷰와 날짜를 새로 고침합니다.
scheduler.setCurrentView();
// 현재 뷰에서 2012년 7월 4일을 표시합니다.
scheduler.setCurrentView(new Date(2012,7,4));
// Week 뷰에서 2012년 5월 3일을 표시합니다.
scheduler.setCurrentView(new Date(2012,5,3), "week");
~~~

### Related samples
- [Mini calendar in the scheduler header](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- 기본 뷰 이름에는 'day', 'week', 'month'가 포함됩니다. 다른 뷰를 사용할 때는 해당 뷰의 <b>name</b> 파라미터를 사용하세요.
- 이 메서드를 호출하면 [onBeforeViewChange](api/event/onbeforeviewchange.md)와 [onViewChange](api/event/onviewchange.md) 이벤트가 발생합니다.
- 이 메서드는 [updateView](api/method/updateview.md)와 유사하지만, 중요한 차이점은 [updateView](api/method/updateview.md)는 **어떤 이벤트도 트리거하지 않습니다**.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)
