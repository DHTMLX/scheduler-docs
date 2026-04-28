---
sidebar_label: "limit_start"
title: "limit_start config"
description: "허용된 날짜 범위의 시작 경계를 설정합니다."
---

# limit_start

### Description

@short: 허용된 날짜 범위의 시작 경계를 설정합니다.

@signature: limit_start: Date

### Example

~~~jsx
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
...
scheduler.init('scheduler_here', new Date(2027,5,30), "week");
~~~

**Default value:** null

### Related samples
- [Limiting dates for creating events](https://docs.dhtmlx.com/scheduler/samples/03_extensions/16_limitation.html)

### Details

:::note
 이 속성을 사용하려면 [limit](guides/extensions-list.md#limit) 플러그인이 활성화되어 있어야 합니다. 
:::

**limit_start** 및 **limit_end** 설정은 새 이벤트를 생성할 수 있는 날짜 범위를 제한합니다. 또한, `limit_view` 속성을 활성화하면 허용된 범위 밖의 이벤트를 보는 것을 방지할 수 있습니다:

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

### Related API
- [limit_end](api/config/limit_end.md)
- [limit_view](api/config/limit_view.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
