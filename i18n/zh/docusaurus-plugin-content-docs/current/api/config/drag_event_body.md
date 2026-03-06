---
sidebar_label: "drag_event_body"
title: "drag_event_body config"
description: "允许通过抓取事件主体的任意部分来拖动调度器事件"
---

# drag_event_body

### Description

@short: 允许通过抓取事件主体的任意部分来拖动调度器事件

@signature: drag_event_body: boolean

### Example

~~~jsx
scheduler.config.drag_event_body = false;
~~~

**Default value:** true

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### Details

当此选项关闭时，拖动事件仅限于事件的标题区域。
