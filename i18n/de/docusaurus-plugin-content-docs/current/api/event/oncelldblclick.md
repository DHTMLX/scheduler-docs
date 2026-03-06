---
sidebar_label: "onCellDblClick"
title: "onCellDblClick event"
description: "Wird ausgelöst, wenn ein Benutzer auf eine Zelle doppelklickt (nur in der Timeline-Ansicht)"
---

# onCellDblClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer auf eine Zelle doppelklickt (nur in der Timeline-Ansicht)

@signature: onCellDblClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - Der nullbasierte Index der angeklickten Spalte
- `y_ind` - (required) *number* - Der nullbasierte Index der angeklickten Zeile
- `x_val` - (required) *object* - Ein Date-Objekt, das den Startzeitstempel der angeklickten Zelle repräsentiert
- `y_val` - (required) *array* - Ein Array, das die Datenobjekte enthält, die sich in der angeklickten Zelle befinden
- `e` - (required) *Event* - Das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onCellDblClick", function (x_ind, y_ind, x_val, y_val, e){
    //Hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

**Applicable views:** [Timeline view](views/timeline.md)

### Details

:::note

Dieses Event wird nur in der Timeline-Ansicht ausgelöst
 
:::
