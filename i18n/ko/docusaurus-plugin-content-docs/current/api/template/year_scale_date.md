---
sidebar_label: "year_scale_date"
title: "year_scale_date template"
description: "뷰의 월 블록 내 서브 헤더에 표시되는 요일 이름을 정의합니다."
---

# year_scale_date

### Description

@short: 뷰의 월 블록 내 서브 헤더에 표시되는 요일 이름을 정의합니다.

@signature: year_scale_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷할 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에 표시할 html 콘텐츠입니다.

### Example

~~~jsx
const formatScaleDate = scheduler.date.date_to_str("%D");
scheduler.templates.year_scale_date = function(date){
    return formatScaleDate(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 템플릿은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Year View Templates"](views/year-view-templates.md)
