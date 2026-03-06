---
sidebar_label: "agenda_day"
title: "agenda_day template"
description: "Agenda 뷰의 날짜 셀 내부에 표시될 내용을 정의합니다."
---

# agenda_day

### Description

@short: Agenda 뷰의 날짜 셀 내부에 표시될 내용을 정의합니다.

@signature: agenda_day: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 형식화가 필요한 날짜입니다.

### Returns
- ` text` - (string) - scheduler에 표시될 html 콘텐츠입니다.

### Example

~~~jsx
const dayDateToStr = scheduler.date.date_to_str("%F %j");
const dayDowToStr = scheduler.date.date_to_str("%l");

scheduler.templates.agenda_day = function(date){ 
    return `<div class="dhx_agenda_day_date">${dayDateToStr(date)}</div>
    <div class="dhx_agenda_day_dow">${dayDowToStr(date)}</div>`;
};
~~~

### Related Guides
- ["아젠다 뷰"](views/agenda.md)

### Change log
- v7.0에 추가됨
