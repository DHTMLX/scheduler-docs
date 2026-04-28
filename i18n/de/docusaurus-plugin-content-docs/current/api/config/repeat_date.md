---
sidebar_label: "repeat_date"
title: "repeat_date config"
description: "Gibt das Datumsformat an, das im Feld 'End by' innerhalb des 'recurring' Lightbox verwendet wird."
---

# repeat_date

### Description

@short: Gibt das Datumsformat an, das im Feld 'End by' innerhalb des 'recurring' Lightbox verwendet wird.

@signature: repeat_date: string

### Example

~~~jsx
scheduler.config.repeat_date = "%m/%d/%Y";
...
scheduler.init('scheduler_here',new Date(2027,05,11),"month");
~~~

**Default value:** "%m.%d.%Y"

### Details

:::note
 Diese Eigenschaft erfordert die Aktivierung der [recurring](guides/extensions-list.md#recurring) Erweiterung. 
:::

Standardmäßig wird das im Feld 'End by' eingegebene Datum als exklusiv behandelt.

### Related API
- [include_end_by](api/config/include_end_by.md)

### Related Guides
- [Wiederkehrende Ereignisse](guides/recurring-events.md)
