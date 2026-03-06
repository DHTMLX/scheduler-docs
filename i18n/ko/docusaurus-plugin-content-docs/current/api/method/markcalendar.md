---
sidebar_label: "markCalendar"
title: "markCalendar method"
description: "특정 날짜에 CSS 클래스를 추가합니다."
---

# markCalendar

### Description

@short: 특정 날짜에 CSS 클래스를 추가합니다.

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - 캘린더 인스턴스
- `date` - (required) *Date* - 하이라이트할 날짜
- `css` - (required) *string* - 적용할 CSS 클래스 이름

### Example

~~~jsx
<style>
my_style{
    color:red !important; // 날짜에 스타일이 적용되도록 'important' 키워드를 사용하세요
}
</style>
<script>
    // 캘린더 객체를 얻는 두 가지 방법:

    // 미니 캘린더를 생성하여 얻기
    var calendar = scheduler.renderCalendar({...});

    // 또는 미니 캘린더의 컨테이너 엘리먼트를 선택하여 얻기
    var calendar = document.querySelector(".dhx_mini_calendar");
    
    ...
    scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
</script>
~~~

### Details

:::note
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

이 메서드는 스케줄러 자체가 아닌 미니 캘린더에서만 작동한다는 점을 유의하세요.
 
:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
