---
sidebar_label: "touch_drag"
title: "touch_drag config"
description: "롱 터치 제스처와 스크롤 제스처를 구분하는 지속 시간을 밀리초 단위로 설정합니다."
---

# touch_drag

### Description

@short: 롱 터치 제스처와 스크롤 제스처를 구분하는 지속 시간을 밀리초 단위로 설정합니다.

@signature: touch_drag: number | boolean

### Example

~~~jsx
scheduler.config.touch_drag = 750;
...
scheduler.init('scheduler_here',new Date(2027,3,10),"week");
~~~

**Default value:** 500

### Details

이 파라미터를 *false*로 설정하면 이벤트 드래그 기능이 비활성화됩니다.

### Related API
- [touch](api/config/touch.md)
- [touch_tip](api/config/touch_tip.md)
- [touch_tooltip](api/config/touch_tooltip.md)

### Related Guides
- ["Mobile Responsive Scheduler"](guides/touch-support.md)
