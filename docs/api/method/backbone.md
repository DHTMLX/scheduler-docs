---
sidebar_label: backbone
title: "backbone method"
description: "makes the scheduler reflect all data changes in the Backbone model and vice versa"
---

# backbone

### Description

@short: Makes the scheduler reflect all data changes in the Backbone model and vice versa

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (required) *Backbone* - collection        the Backbone data collection

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
- [Backbone Integration](integrations/legacy/backbone-integration.md)
