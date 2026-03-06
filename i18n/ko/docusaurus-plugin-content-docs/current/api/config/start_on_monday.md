---
sidebar_label: "start_on_monday"
title: "start_on_monday config"
description: "주의 시작 요일을 설정합니다"
---

# start_on_monday

### Description

@short: 주의 시작 요일을 설정합니다

@signature: start_on_monday: boolean

### Example

~~~jsx
scheduler.config.start_on_monday = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Year view](views/year.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)

### Details

이 파라미터가 *true*로 설정되면 주는 월요일부터 시작하며, *false*로 설정되면 일요일부터 시작합니다.
