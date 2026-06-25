---
sidebar_label: "event_attribute"
title: "event_attribute config"
description: "定义用于通过id识别事件HTML元素的属性名称"
---

# event_attribute

### Description

@short: 定义用于通过id识别事件HTML元素的属性名称

@signature: event_attribute: string

### Example

~~~jsx
scheduler.config.event_attribute = "data-event-id"
~~~

**Default value:** "data-event-id"

### Change log
- 6.0 版本新增
