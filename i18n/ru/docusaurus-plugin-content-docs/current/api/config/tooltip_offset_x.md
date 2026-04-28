---
sidebar_label: tooltip_offset_x
title: "tooltip_offset_x конфигурация"
description: "устанавливает правый (если положительный) отступ позиции всплывающей подсказки"
---

# tooltip_offset_x

### Description

@short: Устанавливает правый (если положительный) отступ позиции всплывающей подсказки

@signature: tooltip_offset_x: number

### Example

~~~jsx
scheduler.config.tooltip_offset_x = 30;

scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Значение по умолчанию:** 10

### Details

:::note
 Этот параметр определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробнее читайте в статье [Tooltips](guides/tooltips.md).
:::

### Related API
- [tooltip_offset_y](api/config/tooltip_offset_y.md)

### Related Guides
- [Tooltips](guides/tooltips.md)