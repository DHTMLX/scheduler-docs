---
sidebar_label: tooltip_hide_timeout
title: "tooltip_hide_timeout конфигурация"
description: "задает длительность в миллисекундах до скрытия tooltip"
---

# tooltip_hide_timeout

### Description

@short: Устанавливает длительность времени в миллисекундах перед скрытием tooltip

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

### Details

:::note
 Этот параметр определяется в расширении **tooltip**, поэтому вам нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробную информацию см. в статье [Tooltips](guides/tooltips.md). 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Tooltips](guides/tooltips.md)