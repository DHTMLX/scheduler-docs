---
sidebar_label: "time_slot_text"
title: "time_slot_text template"
description: "Day/Week 뷰의 배경 셀 안에 표시되는 내용을 정의합니다."
---

# time_slot_text

### Description

@short: Day/Week 뷰의 배경 셀 안에 표시되는 내용을 정의합니다.

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


Day/Week 뷰에서 배경은 30분 단위 구간으로 나뉩니다. 이 템플릿을 사용하면 캘린더의 각 블록에 표시될 HTML 콘텐츠를 설정할 수 있습니다.

### Related API
- [time_slot_class](api/template/time_slot_class.md)

### Change log
- added in v7.0
