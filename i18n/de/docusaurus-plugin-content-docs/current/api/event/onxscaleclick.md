---
sidebar_label: "onXScaleClick"
title: "onXScaleClick event"
description: "Wird ausgelöst, wenn ein Benutzer eine Zelle auf der x-Achse einmal anklickt (gilt nur für die Timeline-Ansicht)."
---

# onXScaleClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer eine Zelle auf der x-Achse einmal anklickt (gilt nur für die Timeline-Ansicht).

@signature: onXScaleClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - der nullbasierte Index der angeklickten Spalte
- `value` - (required) *object* - ein Date-Objekt, das den Startzeitpunkt der angeklickten Zelle repräsentiert
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onXScaleClick", function (index, value,e){
    //beliebige benutzerdefinierte Logik hier
});
~~~
