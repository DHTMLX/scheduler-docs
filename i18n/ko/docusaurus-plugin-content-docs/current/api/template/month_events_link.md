---
sidebar_label: "month_events_link"
title: "month_events_link template"
description: "월별 뷰 셀 내에 'View more' 링크가 어떻게 표시되는지 제어합니다"
---

# month_events_link

### Description

@short: 월별 뷰 셀 내에 'View more' 링크가 어떻게 표시되는지 제어합니다

@signature: month_events_link: (date: Date, count: number) =\> string

### Parameters

- `date` - (required) *Date* - 해당 월 셀에 해당하는 날짜
- `count` - (required) *number* - 해당 셀의 전체 이벤트 수

### Returns
- ` text` - (string) - 스케줄러에 표시될 HTML 콘텐츠

### Example

~~~jsx
// 기본 구현 예시
scheduler.templates.month_events_link = function(date, count){
    return "<a>View more("+count+" events)</a>";
};
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Related API
- [max_month_events](api/config/max_month_events.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- ["Month View Templates"](views/month-view-templates.md)
- ["Month View"](views/month.md#limitingthenumberofeventsinacell)
