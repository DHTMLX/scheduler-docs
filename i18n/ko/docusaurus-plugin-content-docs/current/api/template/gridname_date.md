---
sidebar_label: "GRID_date"
title: "GRID_date template"
description: "뷰 헤더에 표시되는 날짜를 설정합니다."
---

# GRID_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 뷰 헤더에 표시되는 날짜를 설정합니다.

@signature: GRID_date: (start: Date, end: Date) =\> string;

### Parameters

- `start` - (required) *Date* - 뷰의 시작 날짜
- `end` - (required) *Date* - 뷰의 종료 날짜

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 HTML 텍스트

### Example

~~~jsx
//기본 정의
scheduler.templates.grid_date = function(start, end){
    return scheduler.templates.day_date(start)
    + " - "
    + scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 이 템플릿은 [grid_view](guides/extensions-list.md#grid-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
