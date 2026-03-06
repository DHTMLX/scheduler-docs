---
sidebar_label: "renderEvent"
title: "renderEvent method"
description: "커스텀 이벤트 박스의 HTML 콘텐츠를 생성합니다"
---

# renderEvent

### Description

@short: 커스텀 이벤트 박스의 HTML 콘텐츠를 생성합니다

@signature: renderEvent: (container: HTMLElement, event: any) =\> boolean

### Parameters

- `container` - (required) *HTMLElement* - 이벤트의 컨테이너 요소
- `event` - (required) *object* - 이벤트 데이터 객체

### Returns
- ` display` - (boolean) - <ul><li><b>true</b> - scheduler가 커스텀 폼을 사용함</li><li><b>false</b> - scheduler가 기본 폼으로 대체됨</li></ul>

### Example

~~~jsx
scheduler.renderEvent = function(container, ev) {
    var container_width = container.style.width;
    var html = "<div class='dhx_event_move my_event_move' style='width:" +
    + container_width + "'></div>";
    ...
    container.innerHTML = html;
    return true; 
}
~~~

### Related samples
- [Custom event box](https://docs.dhtmlx.com/scheduler/samples/02_customization/27_custom_event_box.html)

### Details

이 메서드는 Day 뷰나 Week 뷰처럼 수직 스케일이 있는 뷰에서만 적용된다는 점을 유의하세요.

### Related Guides
- ["커스텀 이벤트 박스"](guides/custom-events-display.md)
