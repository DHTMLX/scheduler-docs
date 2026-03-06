---
sidebar_label: "time_slot_class"
title: "time_slot_class template"
description: "Day 및 Week 뷰에서 배경 셀의 CSS 클래스를 정의합니다."
---

# time_slot_class

### Description

@short: Day 및 Week 뷰에서 배경 셀의 CSS 클래스를 정의합니다.

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

Day 및 Week 뷰는 배경을 30분 단위 세그먼트로 표시합니다. 이 템플릿을 사용하면 캘린더 내의 특정 배경 셀에 사용자 지정 CSS 클래스를 지정할 수 있습니다.

### Related API
- [time_slot_text](api/template/time_slot_text.md)

### Change log
- v7.0에 추가됨
