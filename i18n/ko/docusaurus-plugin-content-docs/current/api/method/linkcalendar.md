---
sidebar_label: "linkCalendar"
title: "linkCalendar method"
description: "이 메서드는 스케줄러에서 활성 날짜가 변경될 때마다 미니 캘린더의 활성 날짜를 업데이트합니다."
---

# linkCalendar

### Description

@short: 이 메서드는 스케줄러에서 활성 날짜가 변경될 때마다 미니 캘린더의 활성 날짜를 업데이트합니다.

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - 미니 캘린더 인스턴스입니다.
- `shift` - (required) *function* - 미니 캘린더와 스케줄러의 활성 날짜 간 차이를 결정하는 함수입니다. 스케줄러의 날짜를 입력으로 받아 미니 캘린더에 표시할 날짜를 반환합니다.

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// 미니 캘린더는 항상 스케줄러보다 한 달 앞선 날짜를 표시합니다.
scheduler.linkCalendar(calendar, function(date){
    return scheduler.date.add(date, 1, "month");  
});
~~~

### Related samples
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 이 메서드를 사용하려면 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
