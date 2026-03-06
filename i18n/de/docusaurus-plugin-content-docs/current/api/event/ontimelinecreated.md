---
sidebar_label: "onTimelineCreated"
title: "onTimelineCreated event"
description: "Wird ausgelöst, sobald die Timeline-Ansicht eingerichtet wurde, aber noch nicht auf der Seite angezeigt wird (gilt nur für die Timeline-Ansicht)"
---

# onTimelineCreated

### Description

@short: Wird ausgelöst, sobald die Timeline-Ansicht eingerichtet wurde, aber noch nicht auf der Seite angezeigt wird (gilt nur für die Timeline-Ansicht)

@signature: onTemplatesReady: (config: object) =\> void

### Parameters

- `config` - (required) *object* - Das Konfigurationsobjekt für die Timeline-Ansicht

### Example

~~~jsx
scheduler.attachEvent("onTimelineCreated", function (config){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird von der [createTimelineView](api/method/createtimelineview.md) Methode aufgerufen.
