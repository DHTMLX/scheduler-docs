---
sidebar_label: tooltip_timeout
title: "Конфигурация tooltip_timeout"
description: "Устанавливает задержку в миллисекундах до отображения tooltip для задачи"
---

# tooltip_timeout

### Description

@short: Устанавливает задержку в миллисекундах перед отображением tooltip для задачи

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_timeout = 1000;
scheduler.init("scheduler_here", new Date(2027, 10, 20), "week");
~~~

**Значение по умолчанию:** 30

### Details

:::note
 Эта опция определяется в расширении **tooltip**, поэтому нужно активировать плагин [tooltip](guides/extensions-list.md#tooltip). Подробности см. в статье [Tooltips](guides/tooltips.md).
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Tooltips](guides/tooltips.md)