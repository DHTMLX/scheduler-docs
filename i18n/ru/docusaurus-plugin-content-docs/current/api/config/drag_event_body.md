---
sidebar_label: "drag_event_body"
title: "drag_event_body config"
description: "позволяет перетаскивать события планировщика, захватывая любую часть тела события"
---

# drag_event_body

### Description

@short: Позволяет перетаскивать события планировщика, захватывая любую часть тела события

@signature: drag_event_body: boolean

### Example

~~~jsx
scheduler.config.drag_event_body = false;
~~~

**Default value:** true

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### Details

Когда эта опция отключена, перетаскивание событий возможно только за область заголовка события.
