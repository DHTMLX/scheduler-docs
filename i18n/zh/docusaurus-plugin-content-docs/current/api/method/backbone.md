---
sidebar_label: "backbone"
title: "backbone method"
description: "保持调度器与Backbone模型中的所有更新同步，反之亦然"
---

# backbone

### Description

@short: 保持调度器与Backbone模型中的所有更新同步，反之亦然

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (required) *Backbone* - collection        Backbone数据集合

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
- [Backbone 통합](integrations/legacy/backbone-integration.md)
