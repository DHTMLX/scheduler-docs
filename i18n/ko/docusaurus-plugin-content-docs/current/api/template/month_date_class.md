---
sidebar_label: "month_date_class"
title: "month_date_class template"
description: "하루 셀에 할당되는 CSS 클래스를 정의합니다."
---

# month_date_class

### Description

@short: 하루 셀에 할당되는 CSS 클래스를 정의합니다.

@signature: month_date_class: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜입니다.

### Returns
- ` css_class` - (string) - 해당 요소에 적용될 CSS 클래스입니다.

### Example

~~~jsx
scheduler.templates.month_date_class = function(date){
    return "";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
