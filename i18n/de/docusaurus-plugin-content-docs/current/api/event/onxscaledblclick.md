---
sidebar_label: "onXScaleDblClick"
title: "onXScaleDblClick event"
description: "Wird ausgelöst, wenn ein Benutzer auf eine Zelle der x-Achse doppelklickt (gilt nur für die Timeline-Ansicht)"
---

# onXScaleDblClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf eine Zelle der x-Achse doppelklickt (gilt nur für die Timeline-Ansicht)

@signature: onXScaleDblClick: (index: number, value: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - der nullbasierte Index der angeklickten Spalte
- `value` - (required) *object* - ein Date-Objekt, das den Startzeitstempel der angeklickten Zelle repräsentiert
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onXScaleDblClick", function (index, value, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~
