---
sidebar_label: "hour_scale"
title: "hour_scale template"
description: "Y-축에 표시되는 요소를 정의합니다."
---

# hour_scale

### Description

@short: Y-축에 표시되는 요소를 정의합니다.

@signature: hour_scale: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷할 날짜

### Returns
- ` text` - (string) - 스케줄러에 표시할 때 사용되는 HTML 텍스트

### Example

~~~jsx
scheduler.templates.hour_scale = function(date){
    return scheduler.date.date_to_str(scheduler.config.hour_date)(date);
};
~~~

**Applicable views:** [Day view](views/day.md), [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- ["Day View Templates"](views/day-view-templates.md)
- ["주간 뷰 템플릿"](views/week-view-templates.md)
