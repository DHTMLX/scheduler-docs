---
sidebar_label: "readonly"
title: "readonly config"
description: "aktiviert den Read-Only-Modus des Schedulers"
---

# readonly

### Description

@short: Aktiviert den Read-Only-Modus des Schedulers

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
- [Schreibgeschützter Modus](guides/readonly.md)
