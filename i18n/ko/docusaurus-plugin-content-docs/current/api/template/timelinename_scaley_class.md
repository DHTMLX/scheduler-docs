---
sidebar_label: "TIMELINE_scaley_class"
title: "TIMELINE_scaley_class template"
description: "Y축의 아이템에 할당될 CSS 클래스 이름을 정의합니다."
---

# TIMELINE_scaley_class
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: Y축의 아이템에 할당될 CSS 클래스 이름을 정의합니다.

@signature: TIMELINE_scaley_class: (key: string, label: string, section: object) =\> string;

### Parameters

- `key` - (required) *string* - 섹션의 식별자
- `label` - (required) *string* - 섹션의 라벨
- `section` - (required) *object* - 'key'와 'label' 속성을 포함하는 섹션 객체

### Returns
- ` css_class` - (string) - 해당 요소에 적용할 CSS 클래스

### Example

~~~jsx
scheduler.templates.timeline_scaley_class = function(key, label,  section){ 
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
