---
sidebar_label: "agenda_start"
title: "agenda_start config"
description: "이벤트가 표시되기 시작하는 날짜를 지정합니다."
---

# agenda_start

### Description

@short: 이벤트가 표시되기 시작하는 날짜를 지정합니다.

@signature: agenda_start: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2010, 0, 10), "agenda");
~~~

**Default value:** 현재 사용자의 날짜

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 이 설정은 [agenda_view](guides/extensions-list.md#agenda-view) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [agenda_end](api/config/agenda_end.md)
