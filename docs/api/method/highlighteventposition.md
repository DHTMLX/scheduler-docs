---
sidebar_label: highlightEventPosition
title: "highlightEventPosition method"
description: "highlights the event's duration on the time scale"
---

# highlightEventPosition

### Description

@short: Highlights the event's duration on the time scale

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - the event object

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)
