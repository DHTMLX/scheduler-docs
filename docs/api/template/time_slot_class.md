---
sidebar_label: time_slot_class
title: "time_slot_class template"
description: "specifies the CSS class of the background cell in the Day/Week views"
---

# time_slot_class

### Description

@short: Specifies the CSS class of the background cell in the Day/Week views

@signature: time_slot_class: () =\> void

### Example

~~~jsx
scheduler.templates.time_slot_class=function(date){
    if(date.getHours() < 7 || date.getHours() > 18){
        return "custom_color";    
    }
    
};
~~~

### Details

![time_slot_template](/img/time_slot_template.png)

The background of the Day/Week views consists of 30-minute blocks. The template can be used to add a custom CSS class to any background cell in the calendar.

### Related API
- [time_slot_text](api/template/time_slot_text.md)

### Change log
- added in v7.0
