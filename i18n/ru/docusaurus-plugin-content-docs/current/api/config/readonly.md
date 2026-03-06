---
sidebar_label: "readonly"
title: "readonly config"
description: "включает режим только для чтения в scheduler"
---

# readonly

### Description

@short: Включает режим только для чтения в scheduler

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
- [Режим только для чтения](guides/readonly.md)
