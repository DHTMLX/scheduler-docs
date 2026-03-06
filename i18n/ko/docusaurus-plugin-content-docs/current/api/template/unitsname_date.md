---
sidebar_label: "UNITS_date"
title: "UNITS_date template"
description: "뷰 헤더에 표시되는 날짜를 설정합니다"
---

# UNITS_date

### Description

@short: 뷰 헤더에 표시되는 날짜를 설정합니다

@signature: UNITS_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅할 날짜입니다

### Returns
- ` text` - (string) - 스케줄러에 렌더링할 html 텍스트

### Example

~~~jsx
scheduler.templates.unit_date = function(date){
        return scheduler.templates.day_date(date);
};
~~~

**Applicable views:** [Units view](views/units.md)

### Details

:::note
 이 템플릿을 사용하려면 [units](guides/extensions-list.md#units) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["Units View 템플릿"](views/units-view-templates.md)
