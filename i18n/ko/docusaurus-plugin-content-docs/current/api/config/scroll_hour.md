---
sidebar_label: "scroll_hour"
title: "scroll_hour config"
description: "스케줄러에서 24시간 형식의 시간에 따라 시작하는 세로 스크롤 위치를 정의합니다."
---

# scroll_hour

### Description

@short: 스케줄러에서 24시간 형식의 시간에 따라 시작하는 세로 스크롤 위치를 정의합니다.

@signature: scroll_hour: number

### Example

~~~jsx
//스케줄러가 처음에 현재 날짜를 표시하며, 현재 시간으로 스크롤됩니다.
scheduler.config.scroll_hour = new Date().getHours();
...
scheduler.init('scheduler_here', new Date(), "week");
~~~

**Default value:** 0 (스케줄러가 자정(00:00)부터 시간 스케일을 표시함을 의미합니다)

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)
