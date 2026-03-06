---
sidebar_label: "TIMELINE_second_scale_date"
title: "TIMELINE_second_scale_date template"
description: "보조 X축에 표시되는 항목을 정의합니다"
---

# TIMELINE_second_scale_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 보조 X축에 표시되는 항목을 정의합니다

@signature: TIMELINE_second_scale_date: (date: Date) =\> string;

### Parameters

- `date` - (required) *Date* - 포맷팅이 필요한 날짜입니다

### Returns
- ` text` - (string) - scheduler에서 렌더링에 사용되는 html 내용입니다

### Example

~~~jsx
scheduler.templates.timeline_second_scale_date = function(date){
    var timeline = scheduler.matrix.timeline;
    var func = scheduler.date.date_to_str(
        (timeline.second_scale && timeline.second_scale.x_date)?
        timeline.second_scale.x_date:scheduler.config.hour_date
    );
    return func(date);
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿은 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
