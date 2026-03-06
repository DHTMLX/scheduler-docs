---
sidebar_label: "year_month"
title: "year_month template"
description: "뷰 내 월 블록 헤더에 표시되는 월 이름을 정의합니다."
---

# year_month

### Description

@short: 뷰 내 월 블록 헤더에 표시되는 월 이름을 정의합니다.

@signature: year_month: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅할 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 콘텐츠입니다.

### Example

~~~jsx
const formatMonth = scheduler.date.date_to_str("%F");
scheduler.templates.year_month = function(date){
    return formatMonth(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 템플릿은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Year View Templates"](views/year-view-templates.md)
