---
sidebar_label: "select"
title: "select config"
description: "переключает видимость select-бара внутри блока события"
---

# select

### Description

@short: Переключает видимость select-бара внутри блока события

@signature: select: boolean

### Example

~~~jsx
scheduler.config.select = false;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** true

### Details

![select_property](/img/select_property.png)
