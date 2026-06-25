---
sidebar_label: "day_date"
title: "day_date template"
description: "Day 및 Units 뷰의 헤더에 표시되는 날짜를 정의합니다."
---

# day_date

### Description

@short: Day 및 Units 뷰의 헤더에 표시되는 날짜를 정의합니다.

@signature: day_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅되어야 하는 날짜

### Returns
- ` text` - (string) - 스케줄러에 표시될 html 텍스트

### Example

~~~jsx
scheduler.templates.day_date = function(date){
    const formatFunc = scheduler.date.date_to_str(scheduler.config.default_date);
    return formatFunc(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Units view](views/units.md)

### Related Guides
- ["Day View Templates"](views/day-view-templates.md)
