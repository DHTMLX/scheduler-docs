---
sidebar_label: "min_map_size"
title: "min_map_size config"
description: "definiert die kleinste Größe, auf die die Map-Ansicht beim automatischen Größenanpassung schrumpfen kann"
---

# min_map_size

### Description

@short: Definiert die kleinste Größe, auf die die Map-Ansicht beim automatischen Größenanpassung schrumpfen kann

@signature: min_map_size: number

### Example

~~~jsx
scheduler.config.min_map_size = 450;
~~~

**Default value:** 400

### Details

:::note
 Diese Eigenschaft funktioniert nur, wenn das [container_autoresize](guides/extensions-list.md#container-autoresize) Plugin aktiviert ist. 
:::

### Related API
- [container_autoresize](api/config/container_autoresize.md)
- [min_grid_size](api/config/min_grid_size.md)

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#container-autoresize)
- [Kartenansicht](views/map.md#map-related-configuration-options)

### Change log
- hinzugefügt in Version 4.4
