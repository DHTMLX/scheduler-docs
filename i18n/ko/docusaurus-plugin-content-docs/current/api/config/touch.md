---
sidebar_label: "touch"
title: "touch config"
description: "스케줄러에서 터치 지원을 켜거나 끕니다."
---

# touch

### Description

@short: 스케줄러에서 터치 지원을 켜거나 끕니다.

@signature: touch: boolean | string

### Example

~~~jsx
scheduler.config.touch = "force";
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Default value:** true

### Related samples
- [Responsive scheduler](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/13_touch_ui.html)

### Details

문자열로 전달될 경우, 파라미터는 단 하나의 값만 허용합니다 - **'force'**.

<br>

즉, 이 파라미터는 세 가지 값 중 하나를 가질 수 있습니다:

- *true* - 스케줄러가 브라우저의 user-agent 문자열을 검사하여 터치 디바이스를 식별하려 시도하며, 발견되면 터치 지원을 활성화합니다.
- *'force'* - 사용 중인 디바이스와 상관없이 항상 터치 지원을 활성화 상태로 유지합니다.
- *false* - 터치 지원을 비활성화합니다.

### Related API
- [touch_drag](api/config/touch_drag.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
