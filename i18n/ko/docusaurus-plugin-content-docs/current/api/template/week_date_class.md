---
sidebar_label: "week_date_class"
title: "week_date_class template"
description: "요일 셀에 할당되는 CSS 클래스를 정의합니다"
---

# week_date_class

### Description

@short: 요일 셀에 할당되는 CSS 클래스를 정의합니다

@signature: week_date_class: (start: Date, today: Date) =\> string

### Parameters

- `start` - (required) *Date* - 열의 시작 날짜
- `today` - (required) *Date* - 현재 날짜

### Returns
- ` css_class` - (string) - 해당 요소에 적용될 css 클래스

### Example

~~~jsx
scheduler.templates.week_date_class = function(start, today){
    return "";
};
~~~

**Applicable views:** [Week view](views/week.md), [Units view](views/units.md)

### Related Guides
- ["주간 뷰 템플릿"](views/week-view-templates.md)
