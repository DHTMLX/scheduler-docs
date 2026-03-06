---
sidebar_label: "calendar_month"
title: "calendar_month template"
description: "미니 캘린더 헤더(날짜 선택기)에 표시할 날짜를 설정합니다."
---

# calendar_month

### Description

@short: 미니 캘린더 헤더(날짜 선택기)에 표시할 날짜를 설정합니다.

@signature: calendar_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 선택한 월의 첫 번째 날짜

### Returns
- ` text` - (string) - 월 레이블 요소의 내부 html 내용

### Example

~~~jsx
const monthLabel = scheduler.date.date_to_str("%F %Y");
scheduler.templates.calendar_month = function (date) {
    return monthLabel(date);
};
~~~

### Details

:::note
 이 템플릿은 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화된 경우에만 작동합니다. 
::: 

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- ["Mini Calendar Templates"](guides/mini-calendar-templates.md)
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
