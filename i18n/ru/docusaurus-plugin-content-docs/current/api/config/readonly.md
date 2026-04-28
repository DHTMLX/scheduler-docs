---
sidebar_label: readonly
title: "readonly config"
description: "активирует режим только для чтения в планировщике"
---

# readonly

### Description

@short: Включает режим только для чтения в scheduler

@signature: readonly: boolean

### Example

~~~jsx
scheduler.config.readonly = true;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** false

### Related API
- [readonly_form](api/config/readonly_form.md)

### Related Guides
- [Режим только для чтения](guides/readonly.md)