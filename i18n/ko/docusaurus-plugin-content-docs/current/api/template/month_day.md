---
sidebar_label: "month_day"
title: "month_day template"
description: "셀 내에서 날짜가 어떻게 표시되는지를 정의합니다."
---

# month_day

### Description

@short: 셀 내에서 날짜가 어떻게 표시되는지를 정의합니다.

@signature: month_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷할 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 표시할 때 사용되는 html 텍스트입니다.

### Example

~~~jsx
scheduler.templates.month_day = function(date){
    var dateToStr_func = scheduler.date.date_to_str(scheduler.config.month_day);
    return  dateToStr_func(date);
};
~~~

**Applicable views:** [Month view](views/month.md), [Year view](views/year.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
- ["Year View Templates"](views/year-view-templates.md)
