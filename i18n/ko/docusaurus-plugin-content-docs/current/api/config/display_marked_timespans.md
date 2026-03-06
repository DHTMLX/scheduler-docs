---
sidebar_label: "display_marked_timespans"
title: "display_marked_timespans config"
description: "스케줄러에서 표시된(차단된) 시간 구간이 하이라이트되는지 여부를 제어합니다."
---

# display_marked_timespans

### Description

@short: 스케줄러에서 표시된(차단된) 시간 구간이 하이라이트되는지 여부를 제어합니다.

@signature: display_marked_timespans: boolean

### Example

~~~jsx
scheduler.config.display_marked_timespans = false;
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** true

### Details

이 속성은 버전 3.5부터 사용 가능합니다.

:::note
 이 속성은 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

*false*로 설정하면, 시간 구간은 여전히 차단되지만 특별한 하이라이트 없이 일반 스케줄러 셀로 표시됩니다.

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
