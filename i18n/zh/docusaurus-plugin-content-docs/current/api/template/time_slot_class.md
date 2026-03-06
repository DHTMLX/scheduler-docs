---
sidebar_label: "time_slot_class"
title: "time_slot_class template"
description: "定义Day视图和Week视图中背景单元格的CSS类"
---

# time_slot_class

### Description

@short: 定义Day视图和Week视图中背景单元格的CSS类

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

Day视图和Week视图将背景显示为30分钟的时间段。此template允许你为日历中的任何背景单元格分配自定义的CSS类。

### Related API
- [time_slot_text](api/template/time_slot_text.md)

### Change log
- added in v7.0
