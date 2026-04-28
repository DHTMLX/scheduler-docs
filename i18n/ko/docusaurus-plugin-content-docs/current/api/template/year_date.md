---
sidebar_label: "year_date"
title: "year_date template"
description: "뷰의 헤더에 표시되는 날짜를 설정합니다"
---

# year_date

### Description

@short: 뷰의 헤더에 표시되는 날짜를 설정합니다

@signature: year_date: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` text` - (string) - 스케줄러 렌더링에 사용되는 HTML 텍스트

### Example

~~~jsx
const date_to_str = scheduler.date.date_to_str(scheduler.locale.labels.year_tab +" %Y");

scheduler.templates.year_date = function(date){
    return date_to_str(date);
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 템플릿은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Year View Templates"](views/year-view-templates.md)
