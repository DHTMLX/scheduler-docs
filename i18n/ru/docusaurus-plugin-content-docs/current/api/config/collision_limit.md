---
sidebar_label: collision_limit
title: "collision_limit конфигурация"
description: "устанавливает максимально допустимое количество событий в каждом временном интервале"
---

# collision_limit

### Description

@short: Устанавливает максимальное допустимое число событий в каждом временном интервале

@signature: collision_limit: number

### Example

~~~jsx
scheduler.config.collision_limit = 2;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Значение по умолчанию:** 1

### Details

:::note
 Свойство требует активации плагина [collision](guides/extensions-list.md#collision).
:::

### Related Guides
- [Предотвращение двойных событий в временном слоте](guides/collisions.md)