---
sidebar_label: "linkCalendar"
title: "linkCalendar method"
description: "Этот метод обновляет активную дату в мини-календаре каждый раз, когда активная дата в планировщике изменяется."
---

# linkCalendar

### Description

@short: Этот метод обновляет активную дату в мини-календаре каждый раз, когда активная дата в планировщике изменяется.

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - Экземпляр мини-календаря.
- `shift` - (required) *function* - Функция, которая определяет разницу между активными датами в мини-календаре и планировщике. Принимает дату планировщика в качестве входного параметра и возвращает дату, которая будет отображаться в мини-календаре.

### Example

~~~jsx
var calendar = scheduler.renderCalendar({
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
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 Для работы этого метода требуется включенный плагин [minical](guides/extensions-list.md#minicalendardatepicker). 
:::

### Related Guides
- [Мини-календарь (Date Picker)](guides/minicalendar.md)
