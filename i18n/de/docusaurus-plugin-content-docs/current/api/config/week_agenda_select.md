---
sidebar_label: "week_agenda_select"
title: "week_agenda_select config"
description: "hebt das ausgewählte Ereignis in der Week Agenda Ansicht hervor"
---

# week_agenda_select
:::info
 Dieses Feature ist nur in der PRO Edition verfügbar. 
:::
### Description

@short: Hebt das ausgewählte Ereignis in der Week Agenda Ansicht hervor

@signature: week_agenda_select: boolean

### Example

~~~jsx
scheduler.config.week_agenda_select = false; /*!*/
scheduler.init('scheduler_here', new Date(2013,0,10), "agenda_week");
~~~

**Default value:** true

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 Die Eigenschaft erfordert, dass das [week_agenda](guides/extensions-list.md#week-agenda) Plugin aktiviert ist. 
:::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 Beachten Sie, dass das Setzen von **week_agenda_select** auf *false* nur die Hervorhebung des ausgewählten Ereignisses deaktiviert, jedoch nicht verhindert, dass das Ereignis bearbeitet wird. Um ein Ereignis nicht bearbeitbar zu machen, verwenden Sie die [readonly](api/config/readonly.md) Konfiguration. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Week-Agenda-Ansicht](views/weekagenda.md)
