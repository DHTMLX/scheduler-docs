---
sidebar_label: "tooltip"
title: "tooltip config"
description: "отображает tooltip'ы для событий"
---

# tooltip

### Description

@short: Отображает tooltip'ы для событий

@signature: tooltip: any

### Example

~~~jsx
var tooltip = scheduler.tooltip;
tooltip.hide();
tooltip.show(event, text);
~~~

### Details

:::note
 Опция работает только если активирован плагин [tooltip](guides/extensions-list.md#tooltip). 
:::

### Related Guides
- [Тултипы](guides/tooltips.md)
