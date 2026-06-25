---
sidebar_label: highlight_displayed_event
title: "highlight_displayed_event config"
description: "specifies whether events retrieved by the showEvent method should be highlighted while displaying"
---

# highlight_displayed_event

### Description

@short: Specifies whether events retrieved by the showEvent method should be highlighted while displaying

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Details

The parameter is available from version 3.5 and used only in the context of the [showEvent](api/method/showevent.md) method.

### Related API
- [showEvent](api/method/showevent.md)
