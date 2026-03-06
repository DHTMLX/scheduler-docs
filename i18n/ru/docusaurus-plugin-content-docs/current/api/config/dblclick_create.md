---
sidebar_label: "dblclick_create"
title: "dblclick_create config"
description: "позволяет пользователям создавать события двойным щелчком мыши"
---

# dblclick_create

### Description

@short: Позволяет пользователям создавать события двойным щелчком мыши

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
