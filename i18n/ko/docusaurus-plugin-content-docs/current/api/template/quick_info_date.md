---
sidebar_label: "quick_info_date"
title: "quick_info_date template"
description: "팝업 편집 폼에 표시되는 날짜를 정의합니다."
---

# quick_info_date

### Description

@short: 팝업 편집 폼에 표시되는 날짜를 정의합니다.

@signature: quick_info_date: (start: Date, end: Date, event: any) =\> string

### Parameters

- `start` - (required) *Date* - 이벤트의 시작 날짜
- `end` - (required) *Date* - 이벤트의 종료 날짜
- `event` - (required) *object* - 이벤트 세부 정보

### Returns
- ` text` - (string) - scheduler에 표시되는 html 텍스트

### Example

~~~jsx
scheduler.templates.quick_info_date = function(start, end, ev){
    if (scheduler.isOneDayEvent(ev)){
        return scheduler.templates.day_date(start, end, ev) + " " +
            scheduler.templates.event_header(start, end, ev);
    }else{
        return scheduler.templates.week_date(start, end, ev);
    }
};
~~~

### Details

:::note
 이 템플릿은 [quick_info](guides/extensions-list.md#quick-info) 플러그인이 활성화된 경우에만 작동합니다. 
:::

### Related Guides
- ["공통 템플릿"](guides/common-templates.md#touch-support)
- ["전체 확장 기능 목록"](guides/extensions-list.md#quick-info)
