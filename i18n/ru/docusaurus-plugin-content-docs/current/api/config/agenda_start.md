---
sidebar_label: "agenda_start"
title: "agenda_start config"
description: "Задает дату, с которой начнется отображение событий"
---

# agenda_start

### Description

@short: Задает дату, с которой начнется отображение событий

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2010, 0, 10), "agenda");
~~~

**Default value:** текущая дата пользователя

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 Для этой настройки требуется включение плагина [agenda_view](guides/extensions-list.md#agenda-view). 
:::

### Related API
- [agenda_end](api/config/agenda_end.md)
