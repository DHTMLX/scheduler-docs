---
sidebar_label: "dblclick_create"
title: "dblclick_create config"
description: "사용자가 더블클릭하여 이벤트를 생성할 수 있도록 합니다"
---

# dblclick_create

### Description

@short: 사용자가 더블클릭하여 이벤트를 생성할 수 있도록 합니다

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
