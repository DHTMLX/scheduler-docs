---
sidebar_label: "onBeforeViewChange"
title: "onBeforeViewChange event"
description: "사용자가 현재 뷰에서 다른 뷰로 전환하기 직전에 트리거됩니다"
---

# onBeforeViewChange

### Description

@short: 사용자가 현재 뷰에서 다른 뷰로 전환하기 직전에 트리거됩니다

@signature: onBeforeViewChange: (old_mode: string, old_date: object, mode: string, date: object) =\> boolean

### Parameters

- `old_mode` - (required) *string* - 현재 활성화된 뷰
- `old_date` - (required) *object* - 현재 포커스된 날짜
- `mode` - (required) *string* - 곧 활성화될 뷰
- `date` - (required) *object* - 선택된 새 날짜

### Returns
- ` result` - (boolean) - 기본 이벤트 동작을 계속할지(<b>true</b>) 중단할지(<b>false</b>)를 나타냅니다

### Example

~~~jsx
scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
    //여기에 커스텀 로직을 작성할 수 있습니다
    return true;
});
~~~

### Related samples
- [Configuring the Map view](https://docs.dhtmlx.com/scheduler/samples/03_extensions/23_map_view_timeframes.html)

### Details

- 이 이벤트는 *false*를 반환하여 차단할 수 있으며, 이 경우 스케줄러는 현재 뷰에 머무릅니다.
- 또한 스케줄러가 페이지에 처음 로드될 때도 이 이벤트가 발생하며, 이 경우 **old_mode**와 **old_date**는 정의되지 않습니다.
