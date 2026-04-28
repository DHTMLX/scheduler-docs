---
sidebar_label: agenda_end
title: "agenda_end конфигурация"
description: "устанавливает дату до которой будут отображаться события"
---

# agenda_end

### Description

@short: Устанавливает дату, до которой будут отображаться события

@signature: agenda_end: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "agenda");
~~~

**Значение по умолчанию:** 'agenda_start' (значение) + 1 год

**Доступные представления:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 Свойство требует активации плагина [agenda_view](guides/extensions-list.md#agenda-view).
:::

### Related API
- [agenda_start](api/config/agenda_start.md)