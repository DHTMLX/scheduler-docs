---
sidebar_label: tooltip_offset_y
title: "tooltip_offset_y конфигурация"
description: "задает верхнее (при положительном значении) смещение положения tooltip"
---

# tooltip_offset_y

### Description

@short: Задает верхнее (если положительное) смещение положения tooltip

@signature: tooltip_offset_y: number

### Example

~~~jsx
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Значение по умолчанию:** 20

### Details

:::note
 Этот параметр определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности читайте в статье [Tooltips](guides/tooltips.md).
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips](guides/tooltips.md)