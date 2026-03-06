---
sidebar_label: "onBeforeSectionRender"
title: "onBeforeSectionRender event"
description: "단일 Timeline 섹션이 설정되기 직전, 아직 렌더링되지 않은 상태에서 트리거됩니다 (Timeline 뷰에만 적용됨)"
---

# onBeforeSectionRender
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 단일 Timeline 섹션이 설정되기 직전, 아직 렌더링되지 않은 상태에서 트리거됩니다 (Timeline 뷰에만 적용됨)

@signature: onBeforeSectionRender: (mode: string, section: object, timeline: object) =\> object

### Parameters

- `mode` - (required) *string* - Timeline 모드: 'cell', 'bar', 또는 'tree'
- `section` - (required) *object* - Timeline 설정의 'y_unit' 배열에 정의된 'key'와 'label' 속성을 포함하는 섹션 객체 (예: \{key:1, label:"James Smith"\})
- `timeline` - (required) *object* - Timeline 설정 객체

### Returns
- ` result` - (object) - 섹션 객체

### Example

~~~jsx
scheduler.attachEvent("onBeforeSectionRender", function(mode, section, timeline){
    //여기에 커스텀 로직을 추가할 수 있습니다
    return section;
});
~~~

### Details

이 이벤트를 통해 Timeline 섹션이 렌더링되기 전에 커스터마이징할 수 있습니다.
