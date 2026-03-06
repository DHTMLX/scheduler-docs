---
sidebar_label: "drag_marker_content"
title: "drag_marker_content template"
description: "타임 스케일에서 강조 표시된 블록에 표시되는 내용을 정의합니다"
---

# drag_marker_content

### Description

@short: 타임 스케일에서 강조 표시된 블록에 표시되는 내용을 정의합니다

@signature: drag_marker_content: (start: Date, end: Date, ev: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜  
- `end` - (required) *Date* - 이벤트가 종료될 것으로 예상되는 날짜
- `ev` - (required) *object* - 이벤트 객체

### Returns
- ` text` - (string) - 스케줄러에 표시될 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.drag_marker_content = function(start, end, event){
    return "";
};
~~~

### Details

예를 들어: 

~~~js
scheduler.templates.drag_marker_content = function(start, end, event){
    return "<b>my text</b>";
};
~~~

![scale_content](/img/scale_content.png)

### Related API
- [drag_marker_class](api/template/drag_marker_class.md)
