---
sidebar_label: "week_scale_date"
title: "week_scale_date template"
description: "뷰의 서브 헤더에 표시되는 날짜를 정의합니다."
---

# week_scale_date

### Description

@short: 뷰의 서브 헤더에 표시되는 날짜를 정의합니다.

@signature: week_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅되어야 하는 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러 렌더링에 사용되는 HTML 텍스트입니다.

### Example

~~~jsx
const format = scheduler.date.date_to_str(scheduler.config.day_date);
scheduler.templates.week_scale_date = function(date){
    return format(date);
};
~~~

**Applicable views:** [Week view](views/week.md)

### Related Guides
- ["주간 뷰 템플릿"](views/week-view-templates.md)
