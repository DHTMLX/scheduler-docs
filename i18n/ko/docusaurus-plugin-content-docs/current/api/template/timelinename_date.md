---
sidebar_label: "TIMELINE_date"
title: "TIMELINE_date template"
description: "뷰 헤더에 표시되는 날짜를 정의합니다."
---

# TIMELINE_date
:::info
 이 기능은 PRO 에디션에서만 사용할 수 있습니다. 
:::
### Description

@short: 뷰 헤더에 표시되는 날짜를 정의합니다.

@signature: TIMELINE_date: (date1: Date, date2: Date) =\> string;

### Parameters

- `date1` - (required) *Date* - 이벤트의 시작 날짜
- `date2` - (required) *Date* - 이벤트의 종료 날짜

### Returns
- ` text` - (string) - scheduler에 렌더링할 html 텍스트

### Example

~~~jsx
scheduler.templates.timeline_date = function(date1, date2){
    if (date1.getDay()==date2.getDay() && date2-date1<(24*60*60*1000))
            return scheduler.templates.day_date(date1);
        return scheduler.templates.week_date(date1, date2); 
};
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note
 이 템플릿은 [timeline](guides/extensions-list.md#timeline) 플러그인이 활성화되어 있어야 합니다. 
:::

[timeline_date](api/template/timelinename_date.md) 템플릿이 정의되어 있지 않으면, 헤더의 날짜는 기본적으로 [week_date](api/template/week_date.md) 템플릿에서 사용하는 형식으로 표시됩니다.

### Related Guides
- ["타임라인 뷰 템플릿"](views/timeline-view-templates.md)

