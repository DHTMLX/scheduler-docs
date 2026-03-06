---
sidebar_label: "UNITS_scale_text"
title: "UNITS_scale_text template"
description: "X축에 표시되는 항목을 정의합니다"
---

# UNITS_scale_text

### Description

@short: X축에 표시되는 항목을 정의합니다

@signature: UNITS_scale_text: (key: string, label: string, unit: object, date: Date) =\> string;

### Parameters

- `key` - (required) *string* - 단위의 식별자
- `label` - (required) *string* - 단위의 레이블
- `unit` - (required) *object* - 'key'와 'label'을 포함하는 단위 객체
- `date` - (required) *Date* - 열에 해당하는 날짜 (다중 일 단위 뷰에 유용함)

### Returns
- ` text` - (string) - scheduler에 표시될 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.unit_scale_text = function(key, label, unit, date) {
    if (option.css) {
        return "<span class='" + option.css + "'>" + label + "</span>";
    } else {
        return label;
    }
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 이 템플릿은 [units](guides/extensions-list.md#units) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Units View 템플릿"](views/units-view-templates.md)
