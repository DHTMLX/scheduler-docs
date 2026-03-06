---
sidebar_label: "backbone"
title: "backbone method"
description: "Hält den Scheduler synchron mit allen Updates im Backbone-Modell und umgekehrt"
---

# backbone

### Description

@short: Hält den Scheduler synchron mit allen Updates im Backbone-Modell und umgekehrt

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (required) *Backbone* - collection        die Backbone-Datenkollektion

### Example

~~~jsx
$(".myscheduler").dhx_scheduler({
    date: new Date(2009,5,25),
    mode: "month"
});

scheduler.backbone(events);
~~~

### Related samples
- [Backbone integration](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)

### Related Guides
- [Backbone-Integration](integrations/legacy/backbone-integration.md)
