---
sidebar_label: "month_date"
title: "month_date template"
description: "뷰 헤더에 표시될 날짜를 설정합니다."
---

# month_date

### Description

@short: 뷰 헤더에 표시될 날짜를 설정합니다.

@signature: month_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅할 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 텍스트입니다.

### Example

~~~jsx
scheduler.templates.month_date = function(date){
    const dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_date);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
