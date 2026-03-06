---
sidebar_label: quick_info_date
title: "quick_info_date template"
description: "specifies the date of the pop-up edit form"
---

# quick_info_date

### Description

@short: Specifies the date of the pop-up edit form

@signature: quick_info_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - the date when an event is scheduled to begin
- `end` - (required) *Date* - the date when an event is scheduled to be completed
- `event` - (required) *object* - the event object

### Returns
- ` text` - (string) - html text for rendering in the scheduler

### Example

~~~jsx
scheduler.templates.quick_info_date = function(start, end, ev){
    if (scheduler.isOneDayEvent(ev)){
        return scheduler.templates.day_date(start, end, ev) + " " +
            scheduler.templates.event_header(start, end, ev);
    }else{
        return scheduler.templates.week_date(start, end, ev);
    }
};
~~~

### Details

:::note
 The template requires the [quick_info](guides/extensions-list.md#quick-info) plugin to be activated. 
:::

### Related Guides
- [Common Templates](guides/common-templates.md#touch-support)
- [Full List of Extensions](guides/extensions-list.md#quick-info)
