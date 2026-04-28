---
sidebar_label: agenda_start
title: "agenda_start конфигурация"
description: "устанавливает дату начала отображения событий"
---

# agenda_start

### Description

@short: Устанавливает дату начала отображения событий

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2027, 7, 1);
scheduler.config.agenda_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2027, 0, 10), "agenda");
~~~

**Значение по умолчанию:** текущая дата пользователя

**Доступные представления:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
Свойство требует активации плагина [agenda_view](guides/extensions-list.md#agenda-view).
:::

### Related API
- [agenda_end](api/config/agenda_end.md)