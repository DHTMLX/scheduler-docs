---
sidebar_label: readonly
title: "readonly config"
description: "activates the read-only mode for the scheduler"
---

# readonly

### Description

@short: Activates the read-only mode for the scheduler

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
- [Read-only Mode](guides/readonly.md)
