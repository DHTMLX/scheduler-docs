---
sidebar_label: "agenda_end"
title: "agenda_end config"
description: "定义显示事件的截止日期"
---

# agenda_end

### Description

@short: 定义显示事件的截止日期

@signature: agenda_end: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2025, 7, 1);
scheduler.config.agenda_end = new Date(2027, 7, 1);
...
scheduler.init('scheduler_here', new Date(2026, 0, 10), "agenda");
~~~

**Default value:** 默认为 'agenda_start' 之后一年（值）

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 该设置仅在启用 [agenda_view](guides/extensions-list.md#agenda-view) 插件时有效。 
:::

### Related API
- [agenda_start](api/config/agenda_start.md)
