---
sidebar_label: "unmarkCalendar"
title: "unmarkCalendar method"
description: "지정된 날짜에서 CSS 클래스를 제거합니다."
---

# unmarkCalendar

### Description

@short: 지정된 날짜에서 CSS 클래스를 제거합니다.

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - 미니 캘린더 객체
- `date` - (required) *Date* - 제거할 날짜
- `css` - (required) *string* - 제거할 CSS 클래스 이름

### Example

~~~jsx
// 캘린더 객체를 얻는 두 가지 방법이 있습니다:

// 미니 캘린더를 생성하여 얻기
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// 또는 미니 캘린더가 포함된 컨테이너를 선택하여 얻기
const calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2027,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2027,3,1), "my_style");
~~~

### Details

:::note
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
::: 

:::note

이 메서드는 scheduler 자체가 아니라 미니 캘린더에서만 작동한다는 점을 유의하세요.
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
