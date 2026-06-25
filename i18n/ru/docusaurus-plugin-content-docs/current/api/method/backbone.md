---
sidebar_label: backbone
title: "Метод Backbone"
description: "позволяет планировщику отражать все изменения данных в модели Backbone и наоборот"
---

# backbone

### Description

@short: Позволяет планировщику отражать все изменения данных в модели Backbone и наоборот

@signature: backbone: (events: any) =\> void

### Parameters

- `events` - (обязательный) *Backbone* - коллекция данных Backbone

### Example

~~~jsx
$(".myscheduler").dhx_scheduler({
    date:new Date(2027,5,25),
    mode:"month"
});

scheduler.backbone(events);
~~~

### Related samples
- [Интеграция Backbone](https://docs.dhtmlx.com/scheduler/samples/10_integration/07_backbone.html)

### Related Guides
- [Интеграция Backbone](integrations/legacy/backbone-integration.md)