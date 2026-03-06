---
sidebar_label: "collision_limit"
title: "collision_limit config"
description: "определяет максимальное количество событий, разрешенных в одном временном слоте"
---

# collision_limit

### Description

@short: Определяет максимальное количество событий, разрешенных в одном временном слоте

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
 Это свойство работает только при включенном плагине [collision](guides/extensions-list.md#collision). 
:::

### Related Guides
- [Предотвращение двойных событий в одном временном слоте](guides/collisions.md)
