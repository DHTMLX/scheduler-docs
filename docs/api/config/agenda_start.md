---
sidebar_label: agenda_start
title: "agenda_start config"
description: "sets the date to start displaying events from"
---

# agenda_start

### Description

@short: Sets the date to start displaying events from

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2027, 7, 1);
scheduler.config.agenda_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "agenda");
~~~

**Default value:** the current user's date

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 The property requires the [agenda_view](guides/extensions-list.md#agenda-view) plugin to be activated. 
:::

### Related API
- [agenda_end](api/config/agenda_end.md)
