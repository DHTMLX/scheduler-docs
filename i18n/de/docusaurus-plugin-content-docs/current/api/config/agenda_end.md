---
sidebar_label: "agenda_end"
title: "agenda_end config"
description: "definiert das Datum, bis zu dem Ereignisse angezeigt werden"
---

# agenda_end

### Description

@short: Definiert das Datum, bis zu dem Ereignisse angezeigt werden

@signature: agenda_end: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "agenda");
~~~

**Default value:** ein Jahr nach 'agenda_start' (Wert)

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 Diese Einstellung funktioniert nur, wenn das [agenda_view](guides/extensions-list.md#agenda-view) Plugin aktiviert ist. 
:::

### Related API
- [agenda_start](api/config/agenda_start.md)
