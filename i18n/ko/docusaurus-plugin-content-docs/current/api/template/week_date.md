---
sidebar_label: "week_date"
title: "week_date template"
description: "뷰 헤더에 표시되는 날짜를 설정합니다"
---

# week_date

### Description

@short: 뷰 헤더에 표시되는 날짜를 설정합니다

@signature: week_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 뷰의 시작 날짜
- `end` - (required) *Date* - 뷰의 종료 날짜

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 텍스트

### Example

~~~jsx
scheduler.templates.week_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week view](views/week.md), [Week Agenda view](views/weekagenda.md)

### Related Guides
- ["주간 뷰 템플릿"](views/week-view-templates.md)
- ["WeekAgenda 뷰 템플릿"](views/weekagenda-view-templates.md)
