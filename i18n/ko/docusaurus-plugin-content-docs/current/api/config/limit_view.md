---
sidebar_label: "limit_view"
title: "limit_view config"
description: "사용자가 이벤트를 탐색할 수 있는 날짜 범위를 제한합니다."
---

# limit_view

### Description

@short: 사용자가 이벤트를 탐색할 수 있는 날짜 범위를 제한합니다.

@signature: limit_view: boolean

### Example

~~~jsx
scheduler.init('scheduler_here',new Date(2027,5,17),"week");
...
scheduler.config.limit_view  = true;
~~~

**Default value:** false

### Details

예를 들어, 2023년으로 제한을 설정하면 사용자는 2026년으로 이동할 수 없으며, 2027년 내의 날짜만 접근할 수 있습니다.

만약 새 이벤트 생성 기간을 제한하기 위해 **limit_start/limit_end** 설정도 정의되어 있다면, **limit_view**는 허용된 날짜 범위 외의 이벤트 보기 또한 차단합니다.

~~~js
scheduler.config.limit_start = new Date(2027,5,15);
scheduler.config.limit_end = new Date(2027,6,15);
scheduler.config.limit_view  = true;
~~~

이 설정으로 인해 이벤트는 6월 15일부터 7월 15일 사이에만 생성할 수 있고, 캘린더 내비게이션 역시 해당 날짜들로 제한됩니다.

### Related API
- [limit_start](api/config/limit_start.md)
- [limit_end](api/config/limit_end.md)

### Related Guides
- ["Blocking and Marking Dates"](guides/limits.md)
