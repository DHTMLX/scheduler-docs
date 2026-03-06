---
sidebar_label: "onViewMoreClick"
title: "onViewMoreClick event"
description: "사용자가 Month 뷰에서 'View more' 링크를 클릭할 때 트리거됩니다 (이 이벤트는 Month 뷰에만 적용됩니다)"
---

# onViewMoreClick

### Description

@short: 사용자가 Month 뷰에서 'View more' 링크를 클릭할 때 트리거됩니다 (이 이벤트는 Month 뷰에만 적용됩니다)

@signature: onViewChange: (date: object) =\> boolean

### Parameters

- `date` - (required) *object* - 사용자가 'View more' 링크를 클릭한 셀의 날짜

### Returns
- ` result` - (boolean) - 기본 이벤트 동작이 진행될지(<b>true</b>) 또는 차단될지(<b>false</b>)를 결정합니다

### Example

~~~jsx
scheduler.attachEvent("onViewMoreClick", function(date){
    //여기에 사용자 정의 로직을 작성하세요
});
~~~

### Related samples
- ['View more' link in the Month view](https://docs.dhtmlx.com/scheduler/samples/02_customization/31_view_more.html)

### Details

이 이벤트는 차단할 수 있습니다. *false*를 반환하면 'View more' 링크 클릭 후 Month 뷰가 Day 뷰로 전환되는 동작이 중지됩니다.

### Related API
- [max_month_events](api/config/max_month_events.md)
- [month_events_link](api/template/month_events_link.md)

### Related Guides
- ["Month View"](views/month.md#limitingthenumberofeventsinacell)
