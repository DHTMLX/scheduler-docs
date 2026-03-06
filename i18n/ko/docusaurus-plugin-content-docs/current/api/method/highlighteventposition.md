---
sidebar_label: "highlightEventPosition"
title: "highlightEventPosition method"
description: "타임라인에서 이벤트의 기간을 표시합니다."
---

# highlightEventPosition

### Description

@short: 타임라인에서 이벤트의 기간을 표시합니다.

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - 이벤트 객체

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)
