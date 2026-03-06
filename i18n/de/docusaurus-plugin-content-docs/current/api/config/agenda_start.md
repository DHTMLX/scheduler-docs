---
sidebar_label: "agenda_start"
title: "agenda_start config"
description: "Gibt das Datum an, ab dem Ereignisse angezeigt werden"
---

# agenda_start

### Description

@short: Gibt das Datum an, ab dem Ereignisse angezeigt werden

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2010, 0, 10), "agenda");
~~~

**Default value:** das Datum des aktuellen Benutzers

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 Diese Einstellung erfordert, dass das [agenda_view](guides/extensions-list.md#agenda-view) Plugin aktiviert ist. 
:::

### Related API
- [agenda_end](api/config/agenda_end.md)
