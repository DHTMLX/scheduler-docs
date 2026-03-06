---
sidebar_label: "year_tooltip"
title: "year_tooltip template"
description: "일정이 있는 날짜 셀 위에 표시되는 툴팁을 정의합니다."
---

# year_tooltip

### Description

@short: 일정이 있는 날짜 셀 위에 표시되는 툴팁을 정의합니다.

@signature: year_tooltip: (start: Date, end: Date, event: any) =\> string

### Returns
- ` text` - (string) - 스케줄러 툴팁에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.year_tooltip = function(start,end,ev){
    return ev.text;
};
~~~

**Applicable views:** [Year view](views/year.md)

### Details

:::note
 이 템플릿은 [year_view](guides/extensions-list.md#year) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["Year View Templates"](views/year-view-templates.md)
