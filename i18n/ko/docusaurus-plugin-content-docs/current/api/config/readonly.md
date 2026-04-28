---
sidebar_label: "readonly"
title: "readonly config"
description: "스케줄러의 읽기 전용 모드를 활성화합니다."
---

# readonly

### Description

@short: 스케줄러의 읽기 전용 모드를 활성화합니다.

@signature: readonly: boolean

### Example

~~~jsx
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** false

### Related API
- [readonly_form](api/config/readonly_form.md)

### Related Guides
- ["읽기 전용 모드"](guides/readonly.md)
