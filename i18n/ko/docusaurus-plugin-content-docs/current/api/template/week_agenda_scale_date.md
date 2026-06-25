---
sidebar_label: "week_agenda_scale_date"
title: "week_agenda_scale_date template"
description: "뷰의 일(day) 셀에 표시되는 날짜"
---

# week_agenda_scale_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 뷰의 일(day) 셀에 표시되는 날짜

@signature: week_agenda_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트

### Example

~~~jsx
scheduler.templates.week_agenda_scale_date = function(date) {
        const scale_date_format = scheduler.date.date_to_str("%l, %F %d");
        return scale_date_format(date);
};
~~~

**Applicable views:** [Week Agenda view](views/weekagenda.md)

### Details

:::note
 이 템플릿을 사용하려면 [week_agenda](guides/extensions-list.md#week-agenda) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["WeekAgenda 뷰 템플릿"](views/weekagenda-view-templates.md)
