---
sidebar_label: "tooltip_hide_timeout"
title: "tooltip_hide_timeout config"
description: "Legt fest, wie lange der Tooltip sichtbar bleibt, bevor er verschwindet, gemessen in Millisekunden"
---

# tooltip_hide_timeout

### Description

@short: Legt fest, wie lange der Tooltip sichtbar bleibt, bevor er verschwindet, gemessen in Millisekunden

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
 Diese Option ist Teil der **tooltip** Erweiterung, daher stellen Sie sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Weitere Details finden Sie im Artikel [Tooltips](guides/tooltips.md). 
:::

### Related API
- [tooltip_timeout](api/config/tooltip_timeout.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
