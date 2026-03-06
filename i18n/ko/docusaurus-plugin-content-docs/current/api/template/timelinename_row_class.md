---
sidebar_label: "TIMELINE_row_class"
title: "TIMELINE_row_class template"
description: "타임라인 뷰에서 행에 할당될 CSS 클래스를 정의합니다."
---

# TIMELINE_row_class
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 타임라인 뷰에서 행에 할당될 CSS 클래스를 정의합니다.

@signature: TIMELINE_row_class: (section: object, timeline: object) =\> string;

### Parameters

- `section` - (required) *object* - 섹션 객체
- `timeline` - (required) *object* - 타임라인 객체

### Returns
- ` css_class` - (string) - 해당 요소에 적용할 CSS 클래스

### Example

~~~jsx
scheduler.templates.timeline_row_class = function(section, timeline){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿을 사용하려면 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

기본 구현 예시는 다음과 같습니다:

~~~js
scheduler.templates.TIMELINE_row_class = function(section, timeline){
    if(timeline.folder_events_available && section.children){
        return "folder";
    }
    return "";
};
~~~

### Related API
- [`TIMELINE_cell_class`](api/template/timelinename_cell_class.md)
- [`TIMELINE_cell_value`](api/template/timelinename_cell_value.md)

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)

### Change log
- v5.3.9에 추가됨
