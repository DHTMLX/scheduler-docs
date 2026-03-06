---
sidebar_label: time_slot_text
title: "time_slot_text template"
description: "specifies the content of the background cell in the Day/Week views"
---

# time_slot_text

### Description

@short: Specifies the content of the background cell in the Day/Week views

@signature: time_slot_text: () =\> void

### Example

~~~jsx
scheduler.templates.time_slot_text=function(date){
    if(date.getHours() >= 12 && date.getHours() < 13){
        return "Lunch break";    
    }            
};
~~~

### Details

![time_slot_template](/img/time_slot_template.png)


The background of the Day/Week views consists of 30-minute blocks. The template can be used to define HTML content of every such block in the calendar.

### Related API
- [time_slot_class](api/template/time_slot_class.md)

### Change log
- added in v7.0
