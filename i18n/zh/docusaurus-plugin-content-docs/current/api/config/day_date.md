---
sidebar_label: "day_date"
title: "day_date config"
description: "指定在 Week 和 Units 视图中 X 轴使用的日期格式"
---

# day_date

### Description

@short: 指定在 Week 和 Units 视图中 X 轴使用的日期格式

@signature: day_date: string

### Example

~~~jsx
scheduler.config.day_date = "%F %j";
...
scheduler.init('scheduler_here', new Date(2013, 7, 5), "week");
~~~

**Default value:** "%D, %F %j"

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Details

![weekView_properties](/img/weekView_properties.png)

此配置仅在调度器首次初始化之前设置时生效:

~~~js
scheduler.config.day_date = "%F %j";
scheduler.init('scheduler_here', new Date(2020, 7, 5), "day");
~~~

若要在初始化后更新日期格式，需要重写 [day_date](api/template/day_date.md) 模板:

~~~js
var formatDayDate = scheduler.date.date_to_str("%F %j");
scheduler.templates.day_date = function(date) {
    return formatDayDate(date);
};
~~~

### Related Guides
- [날짜 형식 지정](guides/settings-format.md)
- [레이블, 날짜, 스타일 포매팅](guides/templates.md)
