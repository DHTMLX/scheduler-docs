---
sidebar_label: "month_date"
title: "month_date config"
description: "월 보기 헤더의 형식을 정의합니다"
---

# month_date

### Description

@short: 월 보기 헤더의 형식을 정의합니다

@signature: month_date: string

### Example

~~~jsx
scheduler.config.month_date = "%F, %Y";
...
scheduler.init('scheduler_here',new Date(2013,05,11),"week");
~~~

**Default value:** "%F %Y"

**Applicable views:** [Month view](views/month.md)

### Details

![monthView_properties](/img/monthView_properties.png)

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)
