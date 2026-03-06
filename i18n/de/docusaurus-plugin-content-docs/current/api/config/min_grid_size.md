---
sidebar_label: "min_grid_size"
title: "min_grid_size config"
description: "definiert die kleinste Größe, auf die die Grid-Ansicht beim automatischen Anpassen verkleinert werden kann"
---

# min_grid_size
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Definiert die kleinste Größe, auf die die Grid-Ansicht beim automatischen Anpassen verkleinert werden kann

@signature: min_grid_size: number

### Example

~~~jsx
scheduler.config.min_grid_size = 30;
~~~

**Default value:** 25

### Details

:::note
 Diese Einstellung funktioniert nur, wenn das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin aktiviert ist. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_map_size](api/config/min_map_size.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#container-autoresize)
- [Grid-Ansicht](views/grid.md)

### Change log
- hinzugefügt in Version 4.4
