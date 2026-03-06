---
sidebar_label: displayed_event_text_color
title: "displayed_event_text_color config"
description: "sets the default font color for the events retrieved by the showEvent() method"
---

# displayed_event_text_color

### Description

@short: Sets the default font color for the events retrieved by the showEvent() method

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #7e2727

### Details

The parameter is available from version 3.5 and used only in the context of the [showEvent](api/method/showevent.md) method.

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)
