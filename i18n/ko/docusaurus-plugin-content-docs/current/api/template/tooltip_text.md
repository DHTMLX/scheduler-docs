---
sidebar_label: "tooltip_text"
title: "tooltip_text template"
description: "툴팁에 표시되는 텍스트를 설정합니다"
---

# tooltip_text

### Description

@short: 툴팁에 표시되는 텍스트를 설정합니다

@signature: tooltip_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 객체 자체

### Returns
- ` text` - (string) - scheduler tooltip 안에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.tooltip_text = function(start,end,ev){
    return "<b>Event:</b> "+ev.text+"<br/><b>Start date:</b> " + 
    scheduler.templates.tooltip_date_format(start)+ 
    "<br/><b>End date:</b> "+scheduler.templates.tooltip_date_format(end);
};
~~~

**Applicable views:** [Agenda view](views/agenda.md), [Day view](views/day.md), [Map view](views/map.md), [Month view](views/month.md), [Week view](views/week.md), [Week Agenda view](views/weekagenda.md), [Units view](views/units.md)

### Details

:::note
 이 템플릿은 [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [tooltip_date_format](api/template/tooltip_date_format.md)

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#tooltips)
