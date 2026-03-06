---
sidebar_label: "TIMELINE_tooltip"
title: "TIMELINE_tooltip template"
description: "일정된 이벤트가 포함된 일(day) 셀에 대한 tooltip 텍스트를 제공합니다."
---

# TIMELINE_tooltip
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 일정된 이벤트가 포함된 일(day) 셀에 대한 tooltip 텍스트를 제공합니다.

@signature: TIMELINE_tooltip: (start: Date, end; date, event: object) =\> string;

### Parameters

- `start` - (required) *Date* - 이벤트가 시작되는 날짜  
- `end` - (required) *Date* - 이벤트가 종료되는 날짜
- `event` - (required) *object* - 이벤트 객체

### Returns
- ` text` - (string) - scheduler tooltip에 표시할 html 콘텐츠

### Example

~~~jsx
scheduler.templates.timeline_tooltip = function(start,end,event){
    return event.text;
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿은 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)
