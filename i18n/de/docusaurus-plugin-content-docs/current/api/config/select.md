---
sidebar_label: "select"
title: "select config"
description: "Schaltet die Sichtbarkeit der Select-Leiste innerhalb des Event-Containers um"
---

# select

### Description

@short: Schaltet die Sichtbarkeit der Select-Leiste innerhalb des Event-Containers um

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
