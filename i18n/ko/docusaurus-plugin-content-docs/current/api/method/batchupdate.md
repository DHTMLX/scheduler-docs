---
sidebar_label: "batchUpdate"
title: "batchUpdate method"
description: "여러 이벤트를 한 번에 업데이트합니다"
---

# batchUpdate

### Description

@short: 여러 이벤트를 한 번에 업데이트합니다

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - 콜백 함수
- `noRedraw` - (optional) *boolean* - 선택 사항으로, 콜백 함수 실행 후 Scheduler가 차트를 다시 그릴지 여부를 결정합니다; <i>true</i>이면 다시 그리지 않고, <i>false</i> (기본값)이면 다시 그립니다

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(var i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

이 메서드는 여러 이벤트를 한 번에 업데이트하면서 단 한 번의 리렌더링만 수행하므로, 각각의 업데이트가 별도의 리렌더링을 트리거하는 것보다 더 효율적입니다.

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)
