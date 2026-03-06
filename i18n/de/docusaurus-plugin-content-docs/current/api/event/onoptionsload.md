---
sidebar_label: "onOptionsLoad"
title: "onOptionsLoad event"
description: "Wird ausgelöst, nachdem Teile der Timeline/Units-Ansicht aktualisiert wurden"
---

# onOptionsLoad

### Description

@short: Wird ausgelöst, nachdem Teile der Timeline/Units-Ansicht aktualisiert wurden

@signature: onOptionsLoad: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoad", function (){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird ausgelöst, wenn Folgendes geschieht:

- Die Timeline/Unit-Ansicht berechnet neu, welche Abschnitte basierend auf der aktuellen Einstellung der [y_unit](views/timeline.md#initialization) oder [list](views/units.md#initialization) Eigenschaft sichtbar sind;
- [scheduler.resetLightbox](api/method/resetlightbox.md) wird ausgeführt;
- [scheduler.setCurrentView](api/method/setcurrentview.md) wird ausgeführt.

Dieses Event wird in mehreren Szenarien ausgelöst:

- Wenn die Timeline/Units-Ansicht initialisiert wird und Abschnitte zum ersten Mal geparst werden;
- Wenn Abschnitte über die [data](guides/data-formats.md) geladen werden;
- Jedes Mal, wenn [scheduler.updateCollection](api/method/updatecollection.md) aufgerufen wird.
