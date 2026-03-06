---
sidebar_label: "onCellClick"
title: "onCellClick event"
description: "Wird ausgelöst, wenn ein Benutzer einmal auf eine Zelle klickt (gilt nur für die Timeline-Ansicht)"
---

# onCellClick

### Description

@short: Wird ausgelöst, wenn ein Benutzer einmal auf eine Zelle klickt (gilt nur für die Timeline-Ansicht)

@signature: onCellClick: (x_ind: number, y_ind: number, x_val: object, y_val: array, e: Event) =\> void;

### Parameters

- `x_ind` - (required) *number* - Der Spaltenindex der angeklickten Zelle (beginnend bei null)
- `y_ind` - (required) *number* - Der Zeilenindex der angeklickten Zelle (beginnend bei null)
- `x_val` - (required) *object* - Ein Date-Objekt, das die Startzeit der angeklickten Zelle repräsentiert
- `y_val` - (required) *array* - Ein Array, das die Datenobjekte enthält, die sich in der angeklickten Zelle befinden
- `e` - (required) *Event* - Das native Event-Objekt

### Example

~~~jsx
scheduler.attachEvent("onCellClick", function (x_ind, y_ind, x_val, y_val, e){
    // Benutzerdefinierte Logik kann hier hinzugefügt werden
});
~~~

### Details

:::note

Dieses Event wird nur in der Timeline-Ansicht ausgelöst
 
:::
