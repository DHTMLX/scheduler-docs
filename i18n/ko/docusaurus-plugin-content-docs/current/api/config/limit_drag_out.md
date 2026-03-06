---
sidebar_label: "limit_drag_out"
title: "limit_drag_out config"
description: "스케줄러의 보이는 영역을 벗어나서 이벤트를 드래그하는 것을 방지합니다."
---

# limit_drag_out

### Description

@short: 스케줄러의 보이는 영역을 벗어나서 이벤트를 드래그하는 것을 방지합니다.

@signature: limit_drag_out: boolean

### Example

~~~jsx
// 보이는 timeline 영역 밖으로 이벤트를 드래그하는 것을 방지합니다.
scheduler.config.limit_drag_out = true;
~~~

**Default value:** false

**Applicable views:** [Timeline view](views/timeline.md)
