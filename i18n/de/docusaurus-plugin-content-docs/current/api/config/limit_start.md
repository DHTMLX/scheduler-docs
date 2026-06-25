---
sidebar_label: "limit_start"
title: "limit_start config"
description: "legt die Startgrenze für den erlaubten Datumsbereich fest"
---

# limit_start

### Description

@short: Legt die Startgrenze für den erlaubten Datumsbereich fest

@signature: limit_start: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here', new Date(2027,5,30), "week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 Diese Eigenschaft erfordert, dass das [limit](guides/extensions-list.md#limit) Plugin aktiviert ist. 
:::

Die Einstellungen **limit_start** und **limit_end** beschränken den Datumsbereich, in dem neue Events erstellt werden können. Zusätzlich ist es möglich, das Anzeigen von Events außerhalb dieses erlaubten Bereichs zu verhindern, indem die Eigenschaft `limit_view` aktiviert wird:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_end](api/config/limit_end.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- [Blockieren und Markieren von Daten](guides/limits.md)
