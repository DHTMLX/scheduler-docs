---
sidebar_label: "agenda_text"
title: "agenda_text template"
description: "Agenda 뷰의 두 번째 열에 표시되는 텍스트를 정의합니다."
---

# agenda_text

### Description

@short: Agenda 뷰의 두 번째 열에 표시되는 텍스트를 정의합니다.

@signature: agenda_text: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 데이터

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.agenda_text = function(start,end,ev){
     return ev.text;
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 이 템플릿을 사용하려면 [agenda_view](guides/extensions-list.md#agenda-view) 플러그인이 활성화되어 있어야 합니다. 
:::

**agenda_text** 템플릿이 설정되지 않은 경우,  
날짜 부분 'd-m-y'는 [day_date](api/template/day_date.md) 템플릿의 형식을 사용합니다.

### Related Guides
- ["Agenda View Templates"](views/agenda-view-templates.md)
