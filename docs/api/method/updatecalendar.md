---
sidebar_label: updateCalendar
title: "updateCalendar method"
description: "displays the specified date in the mini calendar"
---

# updateCalendar

### Description

@short: Displays the specified date in the mini calendar

@signature: updateCalendar: (calendar: any, new_date: Date) =\> void

### Parameters

- `calendar` - (required) *object* - the mini calendar object
- `new_date` - (required) *Date* - a new date to display in the mini calendar

### Example

~~~jsx
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});
...
scheduler.updateCalendar(calendar, new Date(2013,01,01));
~~~

### Details

:::note
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
