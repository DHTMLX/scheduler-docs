---
sidebar_label: "cascade_event_count"
title: "cascade_event_count config"
description: "캐스케이드에 표시되는 최대 이벤트 수를 정의합니다."
---

# cascade_event_count

### Description

@short: 캐스케이드에 표시되는 최대 이벤트 수를 정의합니다.

@signature: cascade_event_count: number

### Example

~~~jsx
// 캐스케이드에서 보이는 최대 이벤트 수
scheduler.config.cascade_event_count = 4;
~~~

**Default value:** 4

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related samples
- [Displaying events as a cascade](https://docs.dhtmlx.com/scheduler/samples/02_customization/24_cascade_event_display.html)

### Details

이 제한보다 이벤트가 더 많을 경우, 초과된 이벤트들은 캐스케이드 상단에 표시됩니다.

### Related API
- [cascade_event_display](api/config/cascade_event_display.md)
- [cascade_event_margin](api/config/cascade_event_margin.md)
