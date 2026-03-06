---
sidebar_label: "TIMELINE_cell_value"
title: "TIMELINE_cell_value template"
description: "뷰의 셀 내에 예약된 이벤트 수를 나타냅니다."
---

# TIMELINE_cell_value
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 뷰의 셀 내에 예약된 이벤트 수를 나타냅니다.

@signature: TIMELINE_cell_value: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - 셀 내에 포함된 이벤트 객체들의 배열
- `date` - (required) *Date* - 셀에 해당하는 날짜
- `section` - (required) *object* - 섹션 객체

### Returns
- ` text` - (string) - 스케줄러 렌더링에 사용되는 HTML 텍스트

### Example

~~~jsx
scheduler.templates.timeline_cell_value = function(evs, date, section){
    return evs?evs.length:"";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿은 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

:::note

기본적으로 이 템플릿은 Timeline 뷰의 'cell' 모드에서만 호출됩니다. 하지만, [Timeline 뷰](api/method/createtimelineview.md)의 **cell_template** 옵션이 활성화된 경우, [뷰의 다른 모든 모드](views/timeline.md#customcontentincells)에서도 이 템플릿이 호출됩니다.
 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
