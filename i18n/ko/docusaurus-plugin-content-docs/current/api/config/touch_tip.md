---
sidebar_label: "touch_tip"
title: "touch_tip config"
description: "화면 오른쪽 상단에 프롬프트 메시지가 표시되는지 여부를 제어합니다."
---

# touch_tip

### Description

@short: 화면 오른쪽 상단에 프롬프트 메시지가 표시되는지 여부를 제어합니다.

@signature: touch_tip: boolean

### Example

~~~jsx
scheduler.config.touch_tip = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Related API
- [touch](api/config/touch.md)
- [touch_drag](api/config/touch_drag.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
