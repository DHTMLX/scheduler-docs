---
sidebar_label: markCalendar
title: "markCalendar method"
description: "applies a css class to the specified date"
---

# markCalendar

### Description

@short: Applies a css class to the specified date

@signature: markCalendar: (calendar: any, date: Date, css: string) =\> void

### Parameters

- `calendar` - (required) *object* - the calendar object
- `date` - (required) *Date* - the date to mark
- `css` - (required) *string* - the name of a css class

### Example

~~~jsx
<style>
my_style{
    color:red !important;//use the 'important' keyword to make sure that 
}                        // the css property will be applied to the specified date
</style>
<script>
    // you can get the calendar object in one of two ways:

    // either via creating a mini calendar
    var calendar = scheduler.renderCalendar({...});

    // or via using the selector of the container with the mini calendar
    var calendar = document.querySelector(".dhx_mini_calendar");
    
    ...
    scheduler.markCalendar(calendar, new Date(2010,3,1), "my_style");
</script>
~~~

### Details

:::note
 The method requires the [minical](guides/extensions-list.md#mini-calendar-date-picker) plugin to be activated. 
:::

:::note

Note, the method is applied to mini-calendar only, not to the scheduler!
 
:::

### Related API
- [unmarkCalendar](api/method/unmarkcalendar.md)

### Related Guides
- [Mini Calendar (Date Picker)](guides/minicalendar.md)
