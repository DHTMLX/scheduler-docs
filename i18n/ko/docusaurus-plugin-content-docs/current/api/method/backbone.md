---
sidebar_label: "backbone"
title: "backbone method"
description: "Backbone 모델의 모든 업데이트와 스케줄러 간의 동기화를 유지하며, 그 반대 방향도 지원합니다."
---

# backbone

### Description

@short: Backbone 모델의 모든 업데이트와 스케줄러 간의 동기화를 유지하며, 그 반대 방향도 지원합니다.

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (required) *Backbone* - collection        Backbone 데이터 컬렉션

### Example

~~~jsx
$(".myscheduler").dhx_scheduler({
    date:new Date(2009,5,25),
    mode:"month"
});

scheduler.backbone(events);
~~~

### Related samples
- [Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)

### Related Guides
- ["Backbone 통합"](integrations/legacy/backbone-integration.md)
