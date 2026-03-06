---
sidebar_label: "calendar_time"
title: "calendar_time template"
description: "라이트박스의 시작일 및 종료일 필드에 사용되는 날짜 형식을 정의합니다."
---

# calendar_time

### Description

@short: 라이트박스의 시작일 및 종료일 필드에 사용되는 날짜 형식을 정의합니다.

@signature: calendar_time: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜 값

### Returns
- ` text` - (string) - 스케줄러 내에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.calendar_time = scheduler.date.date_to_str("%d-%m-%Y");
~~~

### Details

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_date](api/template/calendar_date.md)
- [calendar_month](api/template/calendar_month.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- ["Mini Calendar Templates"](guides/mini-calendar-templates.md)
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
