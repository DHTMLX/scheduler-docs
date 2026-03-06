---
sidebar_label: "min_grid_size"
title: "min_grid_size config"
description: "определяет минимальный размер, до которого может сжиматься Grid view при автоизменении размера"
---

# min_grid_size
:::info
 Эта функция доступна только в PRO-версии. 
:::
### Description

@short: Определяет минимальный размер, до которого может сжиматься Grid view при автоизменении размера

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Default value:** 25

### Details

:::note
 Эта настройка работает только если активирован плагин [container_autoresize](guides/extensions-list.md#containerautoresize). 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- [Полный список расширений](guides/extensions-list.md#containerautoresize)
- [Грид View](views/grid.md)

### Change log
- добавлено в версии 4.4
