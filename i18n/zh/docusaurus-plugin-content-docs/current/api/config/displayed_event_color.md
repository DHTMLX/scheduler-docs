---
sidebar_label: "displayed_event_color"
title: "displayed_event_color config"
description: "定义由 showEvent() 方法显示的事件的默认背景颜色"
---

# displayed_event_color

### Description

@short: 定义由 showEvent() 方法显示的事件的默认背景颜色

@signature: displayed_event_color: string

### Example

~~~jsx
scheduler.config.displayed_event_color="#DFEDF7";
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** #ffc5ab

### Details

此设置自版本 3.5 起可用，专门用于 [showEvent](api/method/showevent.md) 方法的上下文中。

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_text_color](api/config/displayed_event_text_color.md)
