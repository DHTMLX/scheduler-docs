---
sidebar_label: "GRID_single_date"
title: "GRID_single_date template"
description: "id가 'start_date' 또는 'end_date'인 컬럼에 날짜가 표시되는 방식을 정의합니다."
---

# GRID_single_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Id가 'start_date' 또는 'end_date'인 컬럼에 날짜가 표시되는 방식을 정의합니다.

@signature: GRID_single_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러를 렌더링하는 데 사용되는 HTML 텍스트입니다.

### Example

~~~jsx
scheduler.templates.grid_single_date = function(date){
    return scheduler.templates.day_date(date)+" "+this.event_date(date);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 이 템플릿은 [grid_view](guides/extensions-list.md#grid-view) 플러그인이 활성화된 경우에 작동합니다. 
:::

### Related API
- [GRID_full_date](api/template/gridname_full_date.md)

### Related Guides
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
