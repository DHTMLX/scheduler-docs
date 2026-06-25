---
sidebar_label: dblclick_create
title: "конфигурация dblclick_create"
description: "позволяет создавать события двойным кликом"
---

# dblclick_create

### Description

@short: Позволяет создавать события двойным кликом

@signature: dblclick_create: boolean

### Example

~~~jsx
scheduler.config.dblclick_create = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** true

### Related samples
- [Read-only lightbox](https://docs.dhtmlx.com/scheduler/samples/03_extensions/12_readonly_form.html)