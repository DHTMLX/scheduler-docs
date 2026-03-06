---
sidebar_label: "highlight_displayed_event"
title: "highlight_displayed_event config"
description: "决定通过 showEvent 方法获取的事件在显示时是否高亮显示"
---

# highlight_displayed_event

### Description

@short: 决定通过 showEvent 方法获取的事件在显示时是否高亮显示

@signature: highlight_displayed_event: boolean

### Example

~~~jsx
scheduler.config.highlight_displayed_event=false;
...
scheduler.init('scheduler_here',new Date(2010,0,10),"week");
~~~

**Default value:** true

### Details

此选项自版本 3.5 起可用，仅适用于 [showEvent](api/method/showevent.md) 方法。

### Related API
- [showEvent](api/method/showevent.md)
