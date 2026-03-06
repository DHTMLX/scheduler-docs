---
sidebar_label: "highlightEventPosition"
title: "highlightEventPosition method"
description: "отмечает длительность события на timeline"
---

# highlightEventPosition

### Description

@short: Отмечает длительность события на timeline

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - объект события

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)
