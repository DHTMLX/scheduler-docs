---
sidebar_label: setCurrentView
title: "setCurrentView method"
description: "지정된 보기와 날짜를 표시합니다"
---

# setCurrentView

### Description

@short: 지정된 보기와 날짜를 표시합니다

@signature: setCurrentView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - 표시할 날짜
- `view` - (optional) *string* - 표시할 뷰의 이름

### Example

~~~jsx
// 현재 뷰와 날짜를 표시합니다. 아무 것도 변경하지 않고, 단지 새로 고칩니다
scheduler.setCurrentView();
// 현재 활성 뷰에 2027-08-04를 표시합니다
scheduler.setCurrentView(new Date(2027, 7, 4));
// Week 뷰에서 2027-06-03을 표시합니다
scheduler.setCurrentView(new Date(2027, 5, 3), "week");
~~~

### Related samples
- [스케줄러 헤더의 미니 달력](https://docs.dhtmlx.com/scheduler/samples/05_calendar/01_select.html)
- [스케줄러 외부의 미니 달력](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

- 기본 보기의 이름은 'day', 'week', 'month'입니다. 다른 보기를 지정하려면 해당 `name` 매개변수를 사용하세요.
- 해당 메서드는 [`onBeforeViewChange`](api/event/onbeforeviewchange.md) 및 [`onViewChange`](api/event/onviewchange.md)를 호출합니다.
- 해당 메서드는 [`updateView()`](api/method/updateview.md)와 유사합니다. 차이점은 [`updateView()`](api/method/updateview.md)가 이벤트를 생성하지 않는다는 점뿐입니다.

### Related API
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
- [updateView](api/method/updateview.md)