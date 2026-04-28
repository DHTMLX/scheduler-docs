---
sidebar_label: "agenda_start"
title: "agenda_start config"
description: "指定事件开始显示的日期"
---

# agenda_start

### Description

@short: 指定事件开始显示的日期

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2025, 7, 1);
scheduler.config.agenda_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "agenda");
~~~

**Default value:** 当前用户的日期

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 此设置需要启用 [agenda_view](guides/extensions-list.md#agenda-view) 插件。 
:::

### Related API
- [agenda_end](api/config/agenda_end.md)
