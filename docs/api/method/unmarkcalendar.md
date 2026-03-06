---
sidebar_label: unmarkCalendar
title: "unmarkCalendar method"
description: "removes a css class from the specified date"
---

# unmarkCalendar

### Description

@short: Removes a css class from the specified date

@signature: unmarkCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - the mini calendar object
- `date` - (required) *Date* - the date to unmark
- `css` - (required) *string* - the name of a css class to remove

### Example

~~~jsx
// you can get the calendar object in one of two ways:

// either via creating a mini calendar
var calendar = scheduler.renderCalendar({
    container:"cal_here", 
    navigation:true,
    handler:function(date){
        scheduler.setCurrentView(date, scheduler._mode);
    }
});

// or via using the selector of the container with the mini calendar
var calendar = document.querySelector(".dhx_mini_calendar");

scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
...
scheduler.unmarkCalendar(calendar, new Date(2010,3,1), "my_style");
~~~

### Details

:::note
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
::: 

:::note

Note, the method is applied to mini-calendar only, not to the scheduler!
 
:::

### Related API
- [markCalendar](api/method/markcalendar.md)

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
