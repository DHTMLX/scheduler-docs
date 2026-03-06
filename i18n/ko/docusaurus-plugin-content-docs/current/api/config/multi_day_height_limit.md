---
sidebar_label: "multi_day_height_limit"
title: "multi_day_height_limit config"
description: "멀티 데이 이벤트가 표시되는 섹션의 높이를 제어합니다."
---

# multi_day_height_limit

### Description

@short: 멀티 데이 이벤트가 표시되는 섹션의 높이를 제어합니다.

@signature: multi_day_height_limit: number | boolean

### Example

~~~jsx
scheduler.config.multi_day_height_limit = 30;
...
scheduler.init('scheduler_here',new Date(2013,7,11),"week");
~~~

**Default value:** 200

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Details

boolean 타입으로 사용될 경우, 이 속성은 *false* 값만 허용합니다.

### Related API
- [multi_day](api/config/multi_day.md)

### Change log
- v7.0.1에서 `false`에서 `200`으로 변경됨
