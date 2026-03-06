---
sidebar_label: "limit_time_select"
title: "limit_time_select config"
description: "라이트박스의 시간 선택기를 'last_hour'와 'first_hour' 옵션에 따라 최대값과 최소값으로 제한합니다."
---

# limit_time_select

### Description

@short: 라이트박스의 시간 선택기를 'last_hour'와 'first_hour' 옵션에 따라 최대값과 최소값으로 제한합니다.

@signature: limit_time_select: boolean

### Example

~~~jsx
scheduler.config.limit_time_select = true;
...
scheduler.init('scheduler_here',new Date(2013,0,10),"week");
~~~

**Default value:** false

### Related API
- [last_hour](api/config/last_hour.md)
- [first_hour](api/config/first_hour.md)
