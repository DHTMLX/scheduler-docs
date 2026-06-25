---
sidebar_label: "max_month_events"
title: "max_month_events config"
description: "한 셀에 표시되는 최대 이벤트 수를 제어합니다"
---

# max_month_events

### Description

@short: 한 셀에 표시되는 최대 이벤트 수를 제어합니다

@signature: max_month_events: number

### Example

~~~jsx
scheduler.config.max_month_events = 5;
..
scheduler.init('scheduler_here', new Date(2027,5,30),"month");
~~~

**Applicable views:** [Month view](views/month.md)

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

한 셀에 할당된 이벤트 수가 이 제한을 초과하면, 스케줄러는 'View more' 링크를 표시합니다. 이 링크를 클릭하면 사용자는 해당 날짜의 모든 이벤트가 완전히 나열된 Day 뷰로 이동합니다.

![max_month_events_property](/img/max_month_events_property.png)

### Related API
- [month_events_link](api/template/month_events_link.md)
- [onViewMoreClick](api/event/onviewmoreclick.md)

### Related Guides
- ["Month View"](views/month.md#limitingthenumberofeventsinacell)
