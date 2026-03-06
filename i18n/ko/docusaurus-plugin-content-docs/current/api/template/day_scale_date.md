---
sidebar_label: "day_scale_date"
title: "day_scale_date template"
description: "Day 뷰의 서브 헤더에 표시되는 날짜를 설정합니다."
---

# day_scale_date

### Description

@short: Day 뷰의 서브 헤더에 표시되는 날짜를 설정합니다.

@signature: day_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` text` - (string) - 스케줄러 렌더링에 사용되는 HTML 텍스트

### Example

~~~jsx
const formatDayScale = scheduler.date.date_to_str("%j %M %Y");

scheduler.templates.day_scale_date = function(date){
    return formatDayScale(date);
};
~~~

**Applicable views:** [Day view](views/day.md)

### Related Guides
- ["Day View Templates"](views/day-view-templates.md)
