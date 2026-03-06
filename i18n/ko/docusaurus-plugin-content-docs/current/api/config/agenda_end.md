---
sidebar_label: "agenda_end"
title: "agenda_end config"
description: "이벤트가 표시되는 종료 날짜를 정의합니다."
---

# agenda_end

### Description

@short: 이벤트가 표시되는 종료 날짜를 정의합니다.

@signature: agenda_end: Date

### Example

~~~jsx
scheduler.config.agenda_start = new Date(2012, 7, 1);
scheduler.config.agenda_end = new Date(2014, 7, 1);
...
scheduler.init('scheduler_here', new Date(2013, 0, 10), "agenda");
~~~

**Default value:** 'agenda_start' 이후 1년 (값)

**Applicable views:** [Agenda view](views/agenda.md)

### Related samples
- [Agenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/03_agenda_view.html)

### Details

:::note
 이 설정은 [agenda_view](guides/extensions-list.md#agenda-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [agenda_start](api/config/agenda_start.md)
