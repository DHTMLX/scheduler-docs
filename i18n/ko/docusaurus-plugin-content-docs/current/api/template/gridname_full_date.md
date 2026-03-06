---
sidebar_label: "GRID_full_date"
title: "GRID_full_date template"
description: "id='date'인 컬럼에 날짜가 어떻게 표시되는지 정의합니다."
---

# GRID_full_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Id='date'인 컬럼에 날짜가 어떻게 표시되는지 정의합니다.

@signature: GRID_full_date: (start: Date, end: Date, ev: object) =\> string;

### Parameters

- `start` - (required) *Date* - 이벤트의 시작 날짜  
- `end` - (required) *Date* - 이벤트의 종료 날짜
- `ev` - (required) *object* - 이벤트 세부 정보

### Returns
- ` text` - (string) - 스케줄러 내에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.grid_full_date = function(start,end,event){
    if (scheduler.isOneDayEvent(event))
        return scheduler.templates.grid_single_date(start);
    else
        return scheduler.templates.day_date(start)+" &ndash; "
           +scheduler.templates.day_date(end);
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 이 템플릿은 [grid_view](guides/extensions-list.md#grid-view) 플러그인이 활성화되어 있어야 작동합니다. 
:::

### Related API
- [GRID_single_date](api/template/gridname_single_date.md)

### Related Guides
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
