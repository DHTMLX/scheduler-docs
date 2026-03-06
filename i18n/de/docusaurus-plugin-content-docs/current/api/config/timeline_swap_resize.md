---
sidebar_label: "timeline_swap_resize"
title: "timeline_swap_resize config"
description: "ermöglicht es, dass das Enddatum eines Events während der Größenänderung mit dem Startdatum tauscht, wenn das Enddatum vor das Startdatum verschoben wird"
---

# timeline_swap_resize
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Ermöglicht es, dass das Enddatum eines Events während der Größenänderung mit dem Startdatum tauscht, wenn das Enddatum vor das Startdatum verschoben wird

@signature: timeline_swap_resize: boolean

### Example

~~~jsx
scheduler.config.timeline_swap_resize = false;
~~~

**Default value:** true

### Details

:::note
 Diese Eigenschaft erfordert, dass das [timeline](guides/extensions-list.md#timeline) Plugin aktiviert ist. 
:::

Wenn auf *false* gesetzt, verhindert das Ändern der Größe eines Events, dass das Enddatum per Drag & Drop über das Startdatum hinaus gezogen wird (oder umgekehrt das Startdatum über das Enddatum).

### Related Guides
- [Vollständige Liste der Erweiterungen](guides/extensions-list.md#timeline)

### Change log
- hinzugefügt in Version 4.4
