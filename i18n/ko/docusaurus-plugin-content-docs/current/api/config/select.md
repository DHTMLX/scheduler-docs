---
sidebar_label: "select"
title: "select config"
description: "이벤트 박스 내에서 select 바의 표시 여부를 토글합니다."
---

# select

### Description

@short: 이벤트 박스 내에서 select 바의 표시 여부를 토글합니다.

@signature: select: boolean

### Example

~~~jsx
scheduler.config.select = false;
...
scheduler.init('scheduler_here',new Date(2027,0,10),"week");
~~~

**Default value:** true

### Details

![select_property](/img/select_property.png)
