---
sidebar_label: "onYScaleClick"
title: "onYScaleClick event"
description: "Wird ausgelöst, wenn ein Benutzer einmal auf eine Zelle der y-Achse klickt (gilt nur für die Timeline-Ansicht)."
---

# onYScaleClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer einmal auf eine Zelle der y-Achse klickt (gilt nur für die Timeline-Ansicht).

@signature: onYScaleClick: (index: number, section: object, e: Event) =\> void

### Parameters

- `index` - (required) *number* - der nullbasierte Index der angeklickten Zeile
- `section` - (required) *object* - das Datenobjekt, das der angeklickten Zelle entspricht
- `e` - (required) *Event* - ein natives Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onYScaleClick", function (index, section, e){
    //beliebige benutzerdefinierte Logik hier
});
~~~
