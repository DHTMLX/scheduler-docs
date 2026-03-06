---
sidebar_label: "week_date"
title: "week_date config"
description: "월간 뷰의 서브 헤더에 표시되는 날짜 형식을 정의합니다."
---

# week_date

### Description

@short: 월간 뷰의 서브 헤더에 표시되는 날짜 형식을 정의합니다.

@signature: week_date: string

### Example

~~~jsx
scheduler.config.week_date="%l, %W";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%l"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)
