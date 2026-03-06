---
sidebar_label: "time_slot_text"
title: "time_slot_text template"
description: "определяет содержимое, отображаемое внутри фоновых ячеек в представлениях Day/Week"
---

# time_slot_text

### Description

@short: Определяет содержимое, отображаемое внутри фоновых ячеек в представлениях Day/Week

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


В представлениях Day/Week фон разбит на сегменты по 30 минут. Этот шаблон позволяет задать HTML-содержимое, которое будет отображаться в каждом из этих блоков на календаре.

### Related API
- [time_slot_class](api/template/time_slot_class.md)

### Change log
- добавлено в v7.0
