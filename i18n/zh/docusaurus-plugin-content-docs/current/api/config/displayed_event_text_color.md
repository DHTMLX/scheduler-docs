---
sidebar_label: "displayed_event_text_color"
title: "displayed_event_text_color config"
description: "定义由 showEvent() 方法显示的事件的默认字体颜色"
---

# displayed_event_text_color

### Description

@short: 定义由 showEvent() 方法显示的事件的默认字体颜色

@signature: displayed_event_text_color: string

### Example

~~~jsx
scheduler.config.displayed_event_text_color="#195D8A";
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** #7e2727

### Details

此参数自版本 3.5 起可用，专门用于 [showEvent](api/method/showevent.md) 方法。

### Related API
- [showEvent](api/method/showevent.md)
- [displayed_event_color](api/config/displayed_event_color.md)
