---
sidebar_label: "time_slot_text"
title: "time_slot_text template"
description: "定义 Day/Week 视图中背景单元格内显示的内容"
---

# time_slot_text

### Description

@short: 定义 Day/Week 视图中背景单元格内显示的内容

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


在 Day/Week 视图中，背景被划分为30分钟的时间段。此模板允许您设置在日历中每个时间块内显示的 HTML 内容。

### Related API
- [time_slot_class](api/template/time_slot_class.md)

### Change log
- added in v7.0
