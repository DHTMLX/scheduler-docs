---
sidebar_label: "limit_end"
title: "limit_end config"
description: "definiert die Endgrenze für den erlaubten Datumsbereich"
---

# limit_end

### Description

@short: Definiert die Endgrenze für den erlaubten Datumsbereich

@signature: limit_end: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here',new Date(2027,5,30),"week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Die Einstellungen **limit_start/limit_end** beschränken den Bereich, innerhalb dessen neue Events erstellt werden können. 
Zusätzlich können Sie steuern, ob Events außerhalb dieses Bereichs sichtbar sind, indem Sie die Property [limit_view](api/config/limit_view.md) verwenden:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
