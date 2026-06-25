---
sidebar_label: week_agenda_select
title: "week_agenda_select config"
description: "highlights the selected event in the Week Agenda view"
---

# week_agenda_select
:::info
 This functionality is available in the PRO edition only. 
:::
### Description

@short: Highlights the selected event in the Week Agenda view

@signature: week_agenda_select: boolean

### Example

~~~jsx
scheduler.config.week_agenda_select= false; /*!*/
scheduler.init('scheduler_here',new Date(2027,0,10),"agenda_week");
~~~

**Default value:** true

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 The property requires the [week_agenda](guides/extensions-list.md#week-agenda) plugin to be activated. 
:::

![week_agenda_select](/img/week_agenda_select.png)

:::note
 Note, that the *false* value of the **week_agenda_select** config forbids only highlighting of the selected event but doesn't forbid its editing. To make the event non-editable use the [readonly](api/config/readonly.md) config. 
:::

### Related API
- [readonly](api/config/readonly.md)

### Related Guides
- [Week Agenda View](views/weekagenda.md)
