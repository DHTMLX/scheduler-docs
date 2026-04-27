---
sidebar_label: "updateView"
title: "updateView method"
description: "지정된 뷰와 날짜를 이벤트를 발생시키지 않고 표시합니다."
---

# updateView

### Description

@short: 지정된 뷰와 날짜를 이벤트를 발생시키지 않고 표시합니다.

@signature: updateView: (date?: Date, view?: string) =\> void

### Parameters

- `date` - (optional) *Date* - (선택 사항) 설정할 날짜
- `view` - (optional) *string* - (선택 사항) 뷰 이름

### Example

~~~jsx
// 현재 뷰와 날짜를 변경 없이 새로 고침합니다.
scheduler.updateView();
// 현재 뷰에 2027년 7월 4일을 표시합니다.
scheduler.updateView(new Date(2027,7,4));
// Week 뷰에 2027년 5월 3일을 표시합니다.
scheduler.updateView(new Date(2027,5,3), "week");
~~~

### Related samples
- [Filtering events](https://docs.dhtmlx.com/scheduler/samples/09_api/09_filtering_events.html)

### Details

- 이 함수를 매개변수 없이 호출하면 현재 뷰가 단순히 새로 고침됩니다. 
- 기본 뷰 이름은 'day', 'week', 'month'입니다. 다른 뷰를 사용하려면 해당 뷰의 **name** 매개변수를 제공하세요.
- 이 메서드는 [setCurrentView](api/method/setcurrentview.md)와 유사합니다. 주요 차이점은 **updateView**와 달리 [setCurrentView](api/method/setcurrentview.md)는 [onBeforeViewChange](api/event/onbeforeviewchange.md) 및 [onViewChange](api/event/onviewchange.md) 이벤트를 트리거한다는 점입니다.

### Related API
- [setCurrentView](api/method/setcurrentview.md)
- [onBeforeViewChange](api/event/onbeforeviewchange.md)
- [onViewChange](api/event/onviewchange.md)
