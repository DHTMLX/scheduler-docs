---
sidebar_label: "tooltip"
title: "tooltip config"
description: "zeigt Tooltips für Events an"
---

# tooltip

### Description

@short: Zeigt Tooltips für Events an

@signature: tooltip: any

### Example

~~~jsx
var tooltip = scheduler.tooltip;
tooltip.hide();
tooltip.show(event, text);
~~~

### Details

:::note
 Die Option funktioniert nur, wenn das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. 
:::

### Related Guides
- [Tooltips](guides/tooltips.md)
