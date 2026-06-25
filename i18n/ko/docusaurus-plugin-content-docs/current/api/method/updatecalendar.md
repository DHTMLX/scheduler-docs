---
sidebar_label: "updateCalendar"
title: "updateCalendar method"
description: "미니 캘린더에 선택한 날짜를 표시합니다"
---

# updateCalendar

### Description

@short: 미니 캘린더에 선택한 날짜를 표시합니다

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - 미니 캘린더 인스턴스
- `new_date` - (required) *Date* - 미니 캘린더에 표시할 날짜

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
...
scheduler.updateCalendar(calendar, new Date(2027,01,01));
~~~

### Details

:::note
 이 메서드는 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
