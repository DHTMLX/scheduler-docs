---
sidebar_label: "limit_end"
title: "limit_end config"
description: "허용된 날짜 범위의 종료 경계를 정의합니다."
---

# limit_end

### Description

@short: 허용된 날짜 범위의 종료 경계를 정의합니다.

@signature: limit_end: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
...
scheduler.init('scheduler_here',new Date(2018,5,30),"week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 이 속성은 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

**limit_start/limit_end** 설정은 새 이벤트를 생성할 수 있는 날짜 범위를 제한합니다.
추가로, 이 범위 밖의 이벤트가 보이는지 여부는 [limit_view](api/config/limit_view.md) 속성을 사용하여 제어할 수 있습니다:

~~~js
scheduler.config.limit_start = new Date(2018,5,15);
scheduler.config.limit_end = new Date(2018,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
