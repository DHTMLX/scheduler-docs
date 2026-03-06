---
sidebar_label: "week_agenda_date"
title: "week_agenda_date template"
description: "Week Agenda 뷰의 헤더에 표시되는 날짜를 정의합니다."
---

# week_agenda_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Week Agenda 뷰의 헤더에 표시되는 날짜를 정의합니다.

@signature: week_agenda_date: (start: Date, end: Date) =\> void

### Parameters

- `start` - (required) *Date* - 뷰의 시작 날짜
- `end` - (required) *Date* - 뷰의 종료 날짜

### Example

~~~jsx
scheduler.templates.week_agenda_date = function(start, end){
    return scheduler.templates.day_date(start)+" &ndash; "+
    scheduler.templates.day_date(scheduler.date.add(end,-1,"day"));
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 이 템플릿은 [week_agenda](guides/extensions-list.md#week-agenda) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["WeekAgenda 뷰 템플릿"](views/weekagenda-view-templates.md)

### Change log
- v6.0에 추가됨
