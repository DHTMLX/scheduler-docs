---
sidebar_label: "onTimelineCreated"
title: "onTimelineCreated event"
description: "Timeline 뷰가 설정된 직후에 트리거되며, 페이지에 아직 표시되기 전 상태에서 발생합니다 (Timeline 뷰에만 적용됨)"
---

# onTimelineCreated

### Description

@short: Timeline 뷰가 설정된 직후에 트리거되며, 페이지에 아직 표시되기 전 상태에서 발생합니다 (Timeline 뷰에만 적용됨)

@signature: onTemplatesReady: (config: object) =\> void

### Parameters

- `config` - (required) *object* - Timeline 뷰의 설정 객체

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    //여기에 커스텀 로직 작성
});
~~~

### Details

이 이벤트는 [createTimelineView](api/method/createtimelineview.md) 메서드에서 호출됩니다.
