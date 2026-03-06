---
sidebar_label: "hour_date"
title: "hour_date config"
description: "Y축에 표시되는 시간 형식을 정의합니다. 기본 이벤트 및 라이트박스 템플릿에서도 시간 부분을 포맷하는 데 사용됩니다."
---

# hour_date

### Description

@short: Y축에 표시되는 시간 형식을 정의합니다. 기본 이벤트 및 라이트박스 템플릿에서도 시간 부분을 포맷하는 데 사용됩니다.

@signature: hour_date: string

### Example

~~~jsx
scheduler.config.hour_date = "%H:%i:%s";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** "%H:%i"

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Setting the Y-Axis format](https://docs.dhtmlx.com/scheduler/samples/01_initialization_loading/02_hour_scale_format.html)
- [Removing needless hours from the time scale](https://docs.dhtmlx.com/scheduler/samples/06_timeline/09_drag_duration.html)

### Details

![weekView_properties](/img/weekView_properties.png)

### Related API
- [hour_size_px](api/config/hour_size_px.md)
- [event_header](api/template/event_header.md)
- [event_date](api/template/event_date.md)
- [event_bar_date](api/template/event_bar_date.md)

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)
