---
sidebar_label: "calendar_scale_date"
title: "calendar_scale_date template"
description: "Mini-Calendar 헤더(날짜 선택기)의 요일 레이블 형식을 설정합니다."
---

# calendar_scale_date

### Description

@short: Mini-Calendar 헤더(날짜 선택기)의 요일 레이블 형식을 설정합니다.

@signature: calendar_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 헤더 셀의 요일을 나타내는 특정 날짜

### Returns
- ` text` - (string) - 헤더 셀의 내부 HTML 콘텐츠

### Example

~~~jsx
const weekDayLabel = scheduler.date.date_to_str("%D");
scheduler.templates.calendar_scale_date = function (date) {
    // M | T | W | T | F | S | S
    return weekDayLabel(date).substr(0, 1);
};
~~~

### Details

:::note
 이 템플릿은 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화된 경우에만 작동합니다. 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)

### Related Guides
- ["Mini Calendar Templates"](guides/mini-calendar-templates.md)
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
