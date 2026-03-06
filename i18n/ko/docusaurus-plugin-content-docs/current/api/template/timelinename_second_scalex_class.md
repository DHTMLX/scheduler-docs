---
sidebar_label: "TIMELINE_second_scalex_class"
title: "TIMELINE_second_scalex_class template"
description: "두 번째 X축의 아이템에 추가될 CSS 클래스 이름을 설정합니다."
---

# TIMELINE_second_scalex_class
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 두 번째 X축의 아이템에 추가될 CSS 클래스 이름을 설정합니다.

@signature: TIMELINE_second_scalex_class: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` css_class` - (string) - 해당 요소에 적용될 CSS 클래스

### Example

~~~jsx
scheduler.templates.timeline_second_scalex_class = function(date){
    return "";
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿을 사용하려면 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
