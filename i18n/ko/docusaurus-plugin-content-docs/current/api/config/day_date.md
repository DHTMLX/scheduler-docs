---
sidebar_label: "day_date"
title: "day_date config"
description: "주간(Week) 및 단위(Units) 뷰의 X축에 사용되는 날짜 형식을 지정합니다."
---

# day_date

### Description

@short: 주간(Week) 및 단위(Units) 뷰의 X축에 사용되는 날짜 형식을 지정합니다.

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2027, 7, 5), "week");
~~~

**Default value:** "%D, %F %j"

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

이 설정은 스케줄러가 처음 초기화되기 전에 설정된 경우에만 적용됩니다:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2027, 7, 5), "day");
~~~

초기화 후에 날짜 형식을 변경하려면 [day_date](api/template/day_date.md) 템플릿을 오버라이드해야 합니다:

~~~js
const formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- ["날짜 형식 지정"](guides/settings-format.md)
- ["레이블, 날짜, 스타일 포매팅"](guides/templates.md)
