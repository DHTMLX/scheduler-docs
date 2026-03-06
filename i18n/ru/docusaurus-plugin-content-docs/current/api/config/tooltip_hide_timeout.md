---
sidebar_label: "tooltip_hide_timeout"
title: "tooltip_hide_timeout config"
description: "устанавливает, как долго tooltip остаётся видимым перед тем, как исчезнуть, измеряется в миллисекундах"
---

# tooltip_hide_timeout

### Description

@short: Устанавливает, как долго tooltip остаётся видимым перед тем, как исчезнуть, измеряется в миллисекундах

@signature: tooltip_hide_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

### Details

:::note
 Эта опция является частью расширения **tooltip**, поэтому убедитесь, что плагин [tooltip](guides/extensions-list.md#tooltip) включён. Подробнее можно узнать в статье [Тултипы](guides/tooltips.md). 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Тултипы](guides/tooltips.md)
