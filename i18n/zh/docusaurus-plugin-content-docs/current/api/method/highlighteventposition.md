---
sidebar_label: "highlightEventPosition"
title: "highlightEventPosition method"
description: "在时间线上标记事件的持续时间"
---

# highlightEventPosition

### Description

@short: 在时间线上标记事件的持续时间

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - 事件对象

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)
