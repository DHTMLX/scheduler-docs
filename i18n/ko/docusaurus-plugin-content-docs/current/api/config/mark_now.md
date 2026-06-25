---
sidebar_label: "mark_now"
title: "mark_now config"
description: "현재 시간을 나타내는 마커를 켜거나 끕니다."
---

# mark_now

### Description

@short: 현재 시간을 나타내는 마커를 켜거나 끕니다.

@signature: mark_now: boolean

### Example

~~~jsx
scheduler.config.mark_now = false;
...
scheduler.init('scheduler_here',new Date(2027,05,11),"week");
~~~

**Default value:** true

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Timeline view](views/timeline.md)

### Related samples
- [Current time marking](https://docs.dhtmlx.com/scheduler/samples/02_customization/23_current_time.html)

### Details

:::note
 이 기능은 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 작동합니다. 
:::

:::note
  Timeline 뷰의 경우, 페이지에서 [Timeline](guides/extensions-list.md#timeline) 확장보다 먼저 [limit](guides/extensions-list.md#limit) 확장이 로드되어야 합니다. 
:::

![weekView_properties](/img/weekView_properties.png)

### Related API
- [now_date](api/config/now_date.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
