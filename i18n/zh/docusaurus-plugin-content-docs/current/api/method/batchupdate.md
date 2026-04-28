---
sidebar_label: "batchUpdate"
title: "batchUpdate method"
description: "一次更新多个事件"
---

# batchUpdate

### Description

@short: 一次更新多个事件

@signature: batchUpdate: (callback: SchedulerCallback, noRedraw?: boolean) =\> void

### Parameters

- `callback` - (required) *function* - 回调函数
- `noRedraw` - (optional) *boolean* - 可选，决定 Scheduler 是否在回调函数执行后重新绘制图表；<i>true</i> 表示不重绘，<i>false</i>（默认）表示会重绘

### Example

~~~jsx
scheduler.batchUpdate(function(){
    const events = scheduler.getEvents();
    for(let i = 0; i < events.length; i++){
        const event = events[i];
        event.start_date = scheduler.date.add(event.start_date, 1, "day");
        event.end_date = scheduler.date.add(event.end_date, 1, "day");
        scheduler.updateEvent(event.id);
    }
});
~~~

### Details

此方法允许一次性更新多个事件，仅进行一次重新渲染，比多次更新每次都触发重绘更高效。

### Related API
- [onBeforeBatchUpdate](api/event/onbeforebatchupdate.md)
- [onAfterBatchUpdate](api/event/onafterbatchupdate.md)
