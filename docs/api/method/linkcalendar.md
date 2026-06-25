---
sidebar_label: linkCalendar
title: "linkCalendar method"
description: "'says' to change the active date in the mini calendar each time, the active date in the scheduler is changed"
---

# linkCalendar

### Description

@short: 'says' to change the active date in the mini calendar each time, the active date in the scheduler is changed

@signature: linkCalendar: (calendar: any, shift: SchedulerCallback) =\> void

### Parameters

- `calendar` - (required) *object* - the mini calendar object
- `shift` - (required) *function* - a function that defines the difference between active dates in the mini-calendar <br> and the scheduler. The function takes the scheduler's date as a parameter and <br> returns the date that should be displayed in the mini calendar

### Example

~~~jsx
const calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

//mini calendar will always show one month later than the scheduler
scheduler.linkCalendar(calendar, function(date){
    return scheduler.date.add(date, 1, "month");  
});
~~~

### Related samples
- [Mini calendar outside the scheduler](https://docs.dhtmlx.com/scheduler/samples/05_calendar/05_plain_structure.html)

### Details

:::note
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
