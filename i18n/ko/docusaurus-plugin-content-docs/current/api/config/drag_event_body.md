---
sidebar_label: "drag_event_body"
title: "drag_event_body config"
description: "이벤트 본문의 아무 부분이나 잡아서 스케줄러 이벤트를 드래그할 수 있게 합니다."
---

# drag_event_body

### Description

@short: 이벤트 본문의 아무 부분이나 잡아서 스케줄러 이벤트를 드래그할 수 있게 합니다.

@signature: drag_event_body: boolean

### Example

~~~jsx
scheduler.config.drag_event_body = false;
~~~

**Default value:** true

### Related samples
- [Basic initialization](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/01_basic_init.html)

### Details

이 옵션을 끄면 이벤트 드래그가 이벤트 헤더 영역으로만 제한됩니다.
