---
sidebar_label: min_grid_size
title: "min_grid_size конфигурация"
description: "определяет минимально возможный размер Grid view во время авторезайза"
---

# min_grid_size
:::info
 Эта функциональность доступна только в PRO версии. 
:::
### Description

@short: Определяет минимально возможный размер Grid view во время авторезайза

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Значение по умолчанию:** 25

### Details

:::note
 Свойство требует включённого плагина [container_autoresize](guides/extensions-list.md#container-autoresize) для включения. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#container-autoresize)
- [Grid View](views/grid.md)

### Change log
- добавлено в версии 4.4