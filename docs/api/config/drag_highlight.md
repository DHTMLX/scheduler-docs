---
sidebar_label: drag_highlight
title: "drag_highlight config"
description: "highlights the event's initial position and duration on the time scale when you are dragging an event over the scheduler"
---

# drag_highlight

### Description

@short: Highlights the event's initial position and duration on the time scale when you are dragging an event over the scheduler

@signature: drag_highlight: boolean

### Example

~~~jsx
//removes the highlighting
scheduler.config.drag_highlight = false; /*!*/

scheduler.init('scheduler_here',new Date(2010,0,10),"week");
scheduler.load("./data/events.xml");
~~~

**Default value:** true

### Details

![draghighlight_config](/img/draghighlight_config.png)

### Related API
- [highlightEventPosition](api/method/highlighteventposition.md)
- [drag_marker_class](api/template/drag_marker_class.md)

### Change log
- Highlighting of the event's initial position was added in v7.1
