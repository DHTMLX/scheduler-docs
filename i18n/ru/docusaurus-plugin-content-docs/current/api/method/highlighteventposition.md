---
sidebar_label: highlightEventPosition
title: "highlightEventPosition method"
description: "Подсвечивает продолжительность события на шкале времени"
---

# highlightEventPosition

### Description

@short: Подсвечивает продолжительность события на шкале времени

@signature: highlightEventPosition: (event: any) =\> void

### Parameters

- `event` - (required) *object* - сам объект события

### Example

~~~jsx
scheduler.highlightEventPosition(scheduler.getEvent(1));
~~~

### Related API
- [drag_highlight](api/config/drag_highlight.md)
- [drag_marker_class](api/template/drag_marker_class.md)