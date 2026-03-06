---
sidebar_label: "backbone"
title: "backbone method"
description: "поддерживает синхронизацию планировщика с обновлениями в Backbone модели и наоборот"
---

# backbone

### Description

@short: Поддерживает синхронизацию планировщика с обновлениями в Backbone модели и наоборот

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (required) *Backbone* - collection        коллекция данных Backbone

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
- [Интеграция с Backbone](integrations/legacy/backbone-integration.md)
