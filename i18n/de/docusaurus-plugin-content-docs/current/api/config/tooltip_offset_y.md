---
sidebar_label: "tooltip_offset_y"
title: "tooltip_offset_y config"
description: "Passt die vertikale Position des Tooltips an, indem ein oberer Offset gesetzt wird, wenn der Wert positiv ist"
---

# tooltip_offset_y

### Description

@short: Passt die vertikale Position des Tooltips an, indem ein oberer Offset gesetzt wird, wenn der Wert positiv ist

@signature: tooltip_offset_y: number

### Example

~~~jsx
scheduler.config.tooltip_offset_y = 40;

scheduler.init('scheduler_here',new Date(2023,10,20),"week");
~~~

**Default value:** 20

### Details

:::note
 Diese Option ist Teil der **tooltip** Erweiterung, daher stellen Sie sicher, dass das [tooltip](guides/extensions-list.md#tooltip) Plugin aktiviert ist. Für weitere Details lesen Sie den Artikel [Tooltips](guides/tooltips.md). 
:::

### Related API
- [tooltip_offset_x](api/config/tooltip_offset_x.md)

### Related Guides
- [Tooltips](guides/tooltips.md)
