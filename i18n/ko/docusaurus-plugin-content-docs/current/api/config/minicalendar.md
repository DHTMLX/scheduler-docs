---
sidebar_label: "minicalendar"
title: "minicalendar config"
description: "미니 캘린더 객체를 정의합니다."
---

# minicalendar

### Description

@short: 미니 캘린더 객체를 정의합니다.

@signature: minicalendar: any

### Example

~~~jsx
scheduler.config.minicalendar.mark_events = false; 
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** \{ mark_events: true \}

### Related samples
- [Terrace skin](https://docs.dhtmlx.com/scheduler/samples/07_skins/01_default.html)

### Details

:::note
 이 속성은 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화되어 있어야 합니다. 
::: 

minicalendar 객체는 하나의 속성을 포함합니다:

- **mark_events** - (*array*) 미니 캘린더 내에서 이벤트가 강조 표시될지 여부를 결정합니다.

<br>

![minicalendar_property](/img/minicalendar_property.png)
