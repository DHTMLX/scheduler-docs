---
sidebar_label: "tooltip_timeout"
title: "tooltip_timeout config"
description: "definiert, wie lange es in Millisekunden dauert, bis ein Tooltip für eine Aufgabe erscheint"
---

# tooltip_timeout

### Description

@short: Definiert, wie lange es in Millisekunden dauert, bis ein Tooltip für eine Aufgabe erscheint

@signature: tooltip_timeout: number

### Example

~~~jsx
scheduler.plugins({
    tooltip: true
});

scheduler.config.tooltip_hide_timeout = 5000;
scheduler.init('scheduler_here',new Date(2027,10,20),"week");
~~~

**Default value:** 30

### Details

:::note
 Diese Einstellung ist Teil der **tooltip** Erweiterung, daher stellen Sie sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel [Tooltips](guides/tooltips.md). 
:::

### Related API
- [tooltip_hide_timeout](api/config/tooltip_hide_timeout.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
