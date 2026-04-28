---
sidebar_label: "TIMELINE_scale_date"
title: "TIMELINE_scale_date template"
description: "X축에 표시되는 항목을 정의합니다"
---

# TIMELINE_scale_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: X축에 표시되는 항목을 정의합니다

@signature: TIMELINE_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜

### Returns
- ` text` - (string) - 스케줄러에 표시할 HTML 콘텐츠

### Example

~~~jsx
scheduler.templates.timeline_scale_date = function(date){
   const timeline = scheduler.matrix.timeline;
   const func = scheduler.date.date_to_str(timeline.x_date||scheduler.config.hour_date);
   return func(date);
}
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿은 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
