---
sidebar_label: displayed_event_color
title: "displayed_event_color config"
description: "sets the default background color for the events retrieved by the showEvent() method"
---

# displayed_event_color

### Description

@short: Sets the default background color for the events retrieved by the showEvent() method

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** #ffc5ab

### Details

The parameter is available from version 3.5 and used only in the [showEvent](api/method/showevent.md) method context.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)
