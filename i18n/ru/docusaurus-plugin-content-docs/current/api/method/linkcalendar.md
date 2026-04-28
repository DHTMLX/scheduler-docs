---
sidebar_label: linkCalendar
title: "linkCalendar метод"
description: "для изменения активной даты в мини-календаре каждый раз, когда изменяется активная дата в расписании"
---

# linkCalendar

### Description

@short: для изменения активной даты в мини-календаре каждый раз, когда изменяется активная дата в расписании

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - объект мини-календаря
- `shift` - (required) *function* - функция, задающая разницу между активными датами в мини-календаре <br> и планировщиком. Функция принимает дату планировщика в качестве параметра и <br> возвращает дату, которая должна отображаться в мини-календаре

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// Мини-календарь всегда будет отображать дату на один месяц впереди даты планировщика
scheduler.linkCalendar(calendar, function(date){
    return scheduler.date.add(date, 1, "month");  
});
~~~

### Related samples
- [Мини-календарь вне планировщика](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 Метод требует активации плагина [minical](guides/extensions-list.md#mini-calendar-date-picker). 
:::

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)