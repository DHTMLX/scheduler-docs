---
sidebar_label: "highlightEventPosition"
title: "highlightEventPosition method"
description: "Markiert die Dauer eines Events auf der Timeline"
---

# highlightEventPosition

### Description

@short: Markiert die Dauer eines Events auf der Timeline

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - Das Event-Objekt

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)
