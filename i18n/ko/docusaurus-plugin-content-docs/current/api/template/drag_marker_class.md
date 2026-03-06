---
sidebar_label: "drag_marker_class"
title: "drag_marker_class template"
description: "시간 축에서 이벤트의 강조된 기간에 적용되는 CSS 클래스를 정의합니다"
---

# drag_marker_class

### Description

@short: 시간 축에서 이벤트의 강조된 기간에 적용되는 CSS 클래스를 정의합니다

@signature: drag_marker_class: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜   
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `ev` - (required) *object* - 이벤트 객체

### Returns
- ` classname` - (string) - 요소에 할당되는 css 클래스명

### Example

~~~jsx
scheduler.templates.drag_marker_class = function(start, end, event){
    return "";
};
~~~

### Details

예를 들어: 

~~~html
.myclass{
    background: green;
}
~~~


~~~js
scheduler.templates.drag_marker_class = function(start, end, event){
    return "myclass";
};
~~~

![highlight_scale](/img/highlight_scale.png)

### Related API
- [drag_marker_content](api/template/drag_marker_content.md)
