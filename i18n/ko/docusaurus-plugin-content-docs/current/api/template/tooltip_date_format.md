---
sidebar_label: "tooltip_date_format"
title: "tooltip_date_format template"
description: "툴팁에 표시되는 시작 및 종료 날짜 형식을 정의합니다."
---

# tooltip_date_format

### Description

@short: 툴팁에 표시되는 시작 및 종료 날짜 형식을 정의합니다.

@signature: tooltip_date_format: (date: Date) =\> string

### Parameters

- `date` - (required) *Date* - 포맷이 필요한 날짜입니다.

### Returns
- ` text` - (string) - 스케줄러에서 렌더링할 HTML 텍스트입니다.

### Example

~~~jsx
scheduler.templates.tooltip_date_format=function (date){
    var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
    return formatFunc(date);
}
~~~

### Details

:::note
 이 템플릿은 [tooltip](guides/extensions-list.md#tooltip) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related API
- [tooltip_text](api/template/tooltip_text.md)

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#tooltips)
