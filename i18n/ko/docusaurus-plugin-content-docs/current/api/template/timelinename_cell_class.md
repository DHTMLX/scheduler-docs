---
sidebar_label: "TIMELINE_cell_class"
title: "TIMELINE_cell_class template"
description: "뷰에서 셀에 할당될 CSS 클래스를 설정합니다."
---

# TIMELINE_cell_class
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 뷰에서 셀에 할당될 CSS 클래스를 설정합니다.

@signature: TIMELINE_cell_class: (evs: array, date: Date, section: object) =\> string;

### Parameters

- `evs` - (required) *array* - 셀에 포함된 이벤트 객체들의 배열 ('cell' 모드에서만 사용 가능)
- `date` - (required) *Date* - 해당 열에 대응하는 날짜
- `section` - (required) *object* - 섹션 객체

### Returns
- ` css_class` - (string) - 요소에 적용할 CSS 클래스

### Example

~~~jsx
scheduler.templates.timeline_cell_class = function(evs, date, section){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿을 사용하려면 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related API
- [TIMELINE_row_class](api/template/timelinename_row_class.md)

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
