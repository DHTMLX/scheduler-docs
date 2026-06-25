---
sidebar_label: "time_step"
title: "time_step config"
description: "이벤트 시간 값의 최소 증가 단위(분)를 설정합니다."
---

# time_step

### Description

@short: 이벤트 시간 값의 최소 증가 단위(분)를 설정합니다.

@signature: time_step: number

### Example

~~~jsx
scheduler.config.time_step = 15;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** 5

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Month view](views/month.md), [Units view](views/units.md)

### Related samples
- [Coloring events](https://docs.dhtmlx.com/scheduler/samples/02_customization/01_events_coloring.html)
- [WeekAgenda view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/24_week_agenda.html)

### Details

- 이벤트 시작 및 종료 시간은 time_step의 배수에 맞춰 정렬됩니다. 예를 들어, *time_step = 20*일 경우, 이벤트는 0, 20, 40분 등에서만 시작할 수 있습니다.
- 라이트박스의 시간 선택기 또한 동일한 time_step을 따르며, 이는 Timeline 뷰에도 적용됩니다.
