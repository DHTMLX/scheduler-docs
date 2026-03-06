---
sidebar_label: "dblclick_create"
title: "dblclick_create config"
description: "Ermöglicht es Benutzern, Ereignisse durch Doppelklick zu erstellen"
---

# dblclick_create

### Description

@short: Ermöglicht es Benutzern, Ereignisse durch Doppelklick zu erstellen

@signature: dblclick_create: boolean

### Example

~~~jsx
scheduler.config.dblclick_create = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)
