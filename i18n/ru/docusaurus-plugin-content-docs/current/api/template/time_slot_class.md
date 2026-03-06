---
sidebar_label: "time_slot_class"
title: "time_slot_class template"
description: "определяет CSS класс для фоновых ячеек в представлениях Day и Week"
---

# time_slot_class

### Description

@short: Определяет CSS класс для фоновых ячеек в представлениях Day и Week

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

Представления Day и Week отображают фон в виде сегментов по 30 минут. Этот шаблон позволяет назначить пользовательский CSS класс любой фоновой ячейке внутри календаря.

### Related API
- [time_slot_text](api/template/time_slot_text.md)

### Change log
- добавлено в версии v7.0
