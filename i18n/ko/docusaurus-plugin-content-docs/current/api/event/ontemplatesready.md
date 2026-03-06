---
sidebar_label: "onTemplatesReady"
title: "onTemplatesReady event"
description: "스케줄러 템플릿이 초기화되었을 때 트리거됩니다."
---

# onTemplatesReady

### Description

@short: 스케줄러 템플릿이 초기화되었을 때 트리거됩니다.

@signature: onTemplatesReady: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onTemplatesReady", function(){
    //여기에 커스텀 로직을 작성하세요
});
~~~

### Related samples
- [Custom view](https://docs.dhtmlx.com/scheduler/samples/02_customization/07_custom_view.html)
- [Pointer highlighting](https://docs.dhtmlx.com/scheduler/samples/09_api/05_mouse_over_highlight.html)

### Details

이 이벤트는 스케줄러의 템플릿이 완전히 준비되었음을 알립니다.

커스텀 뷰 생성 코드는 **onTemplatesReady** 이벤트 핸들러 안에 작성하는 것이 권장됩니다. 이렇게 하면 커스텀 뷰의 템플릿이 스케줄러 초기화 전에 준비되어 페이지에 커스텀 뷰가 올바르게 표시될 수 있습니다.
