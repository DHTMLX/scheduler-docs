---
sidebar_label: "tooltip_timeout"
title: "tooltip_timeout config"
description: "определяет, сколько времени в миллисекундах должно пройти, прежде чем появится tooltip для задачи"
---

# tooltip_timeout

### Description

@short: Определяет, сколько времени в миллисекундах должно пройти, прежде чем появится tooltip для задачи

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 30

### Details

:::note
 Эта настройка является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включен. Для получения дополнительной информации смотрите статью [Тултипы](guides/tooltips.md). 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Тултипы](guides/tooltips.md)
