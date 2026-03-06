---
sidebar_label: "readonly"
title: "readonly config"
description: "启用调度器的只读模式"
---

# readonly

### Description

@short: 启用调度器的只读模式

@signature: readonly: boolean

### Example

~~~jsx
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** false

### Related API
- [readonly_form](api/config/readonly_form.md)

### Related Guides
- [읽기 전용 모드](guides/readonly.md)
