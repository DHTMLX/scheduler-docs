---
sidebar_label: "calendar_date"
title: "calendar_date template"
description: "미니 캘린더(날짜 선택기)의 일자 셀 내부에 표시되는 내용을 정의합니다."
---

# calendar_date

### Description

@short: 미니 캘린더(날짜 선택기)의 일자 셀 내부에 표시되는 내용을 정의합니다.

@signature: calendar_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 셀에 표시되는 날짜입니다.

### Returns
- ` text` - (string) - 미니 캘린더의 날짜 셀 내부 HTML 콘텐츠입니다.

### Example

~~~jsx
const dayDate = scheduler.date.date_to_str("%d");
scheduler.templates.calendar_date = function (date) {
    // 캘린더 셀에 툴팁으로 해당 날짜의 이벤트 수를 표시합니다.
    const dayEnd = scheduler.date.add(date, 1, "day");
    const events = scheduler.getEvents(date, dayEnd);
    return "<div title='"+events.length+" events'>" +dayDate(date)+ "</div>";
};
~~~

### Details

:::note
 이 템플릿은 [minical](guides/extensions-list.md#mini-calendar-date-picker) 플러그인이 활성화된 경우에만 작동합니다. 
:::

![mini_calendar_templates](/img/mini_calendar_templates.png)

### Related API
- [calendar_month](api/template/calendar_month.md)
- [calendar_time](api/template/calendar_time.md)
- [calendar_scale_date](api/template/calendar_scale_date.md)

### Related Guides
- ["Mini Calendar Templates"](guides/mini-calendar-templates.md)
- ["미니 캘린더(날짜 선택기)"](guides/minicalendar.md)
