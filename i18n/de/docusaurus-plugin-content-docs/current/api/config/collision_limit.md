---
sidebar_label: "collision_limit"
title: "collision_limit config"
description: "definiert die maximale Anzahl von Events, die in einem einzigen Zeitfenster erlaubt sind"
---

# collision_limit

### Description

@short: Definiert die maximale Anzahl von Events, die in einem einzigen Zeitfenster erlaubt sind

@signature: collision_limit: number

### Example

~~~jsx
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2010,05,11),"week");
~~~

**Default value:** 1

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [collision](guides/extensions-list.md#collision) Plugin aktiviert ist. 
:::

### Related Guides
- [Verhindern von doppelten Ereignissen in einem Zeitfenster](guides/collisions.md)
