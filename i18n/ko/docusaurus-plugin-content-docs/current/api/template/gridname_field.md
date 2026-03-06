---
sidebar_label: "GRID_field"
title: "GRID_field template"
description: "열에 표시되는 텍스트를 정의합니다"
---

# GRID_field
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 열에 표시되는 텍스트를 정의합니다

@signature: GRID_field: (field_name: string, event: object) =\> string;

### Parameters

- `field_name` - (required) *string* - 열의 식별자  
- `event` - (required) *object* - 이벤트 데이터

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.grid_field = function(field_name, event){
    return event[field_name];
};
~~~

**Applicable views:** [Grid view](views/grid.md)

### Details

:::note
 이 템플릿은 [grid_view](guides/extensions-list.md#grid-view) 플러그인이 활성화된 경우에만 작동합니다. 
:::

이 템플릿은 id='date', id='start_date', 또는 id='end_date'인 열에는 적용되지 않습니다. 해당 열들은 
[GRID_full_date](api/template/gridname_full_date.md) 및 [GRID_single_date](api/template/gridname_single_date.md)
템플릿을 대신 사용합니다.

### Related Guides
- ["그리드 뷰 템플릿"](views/grid-view-templates.md)
