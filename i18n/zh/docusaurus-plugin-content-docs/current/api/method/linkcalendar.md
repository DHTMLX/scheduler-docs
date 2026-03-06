---
sidebar_label: "linkCalendar"
title: "linkCalendar method"
description: "每当调度器（scheduler）中的活动日期发生变化时，此方法会更新迷你日历中的活动日期。"
---

# linkCalendar

### Description

@short: 每当调度器（scheduler）中的活动日期发生变化时，此方法会更新迷你日历中的活动日期。

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - 迷你日历实例。
- `shift` - (required) *function* - 一个函数，用于确定迷你日历与调度器中活动日期之间的差异。该函数以调度器的日期作为输入，返回应在迷你日历中显示的日期。

### Example

~~~jsx
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// 迷你日历将始终显示比调度器日期提前一个月的日期
scheduler.linkCalendar(calendar, function(date){
    return scheduler.date.add(date, 1, "month");  
});
~~~

### Related samples
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 此方法需要启用 [minical](guides/extensions-list.md#minicalendardatepicker) 插件。 
:::

### Related Guides
- [미니 캘린더(날짜 선택기)](guides/minicalendar.md)
