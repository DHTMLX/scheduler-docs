---
sidebar_label: "agenda_date"
title: "agenda_date template"
description: "뷰의 헤더에 표시되는 날짜를 정의합니다"
---

# agenda_date

### Description

@short: 뷰의 헤더에 표시되는 날짜를 정의합니다

@signature: agenda_date: (start: Date, end: Date) =\> string

### Parameters

- `start` - (required) *Date* - 뷰의 시작 날짜
- `end` - (required) *Date* - 뷰의 종료 날짜

### Returns
- ` text` - (string) - 표시될 HTML 콘텐츠

### Example

~~~jsx
//기본 정의
scheduler.templates.agenda_date = function(start, end) {
     return '';
};
~~~

**Applicable views:** [Agenda view](views/agenda.md)

### Details

:::note
 이 템플릿은 [agenda_view](guides/extensions-list.md#agenda-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Agenda View Templates"](views/agenda-view-templates.md)
