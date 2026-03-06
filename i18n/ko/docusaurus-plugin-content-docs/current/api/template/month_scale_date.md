---
sidebar_label: "month_scale_date"
title: "month_scale_date template"
description: "월 뷰의 X축에 사용되는 날짜 형식을 정의합니다"
---

# month_scale_date

### Description

@short: 월 뷰의 X축에 사용되는 날짜 형식을 정의합니다

@signature: month_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 형식이 필요한 날짜

### Returns
- ` text` - (string) - 스케줄러에 표시될 html 텍스트

### Example

~~~jsx
const formatMonthScale = scheduler.date.date_to_str("%l");

scheduler.templates.month_scale_date = function(date){
    return formatMonthScale(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
