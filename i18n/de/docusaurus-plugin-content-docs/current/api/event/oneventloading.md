---
sidebar_label: "onEventLoading"
title: "onEventLoading event"
description: "Wird ausgelöst, wenn ein Event aus der Datenquelle geladen wird"
---

# onEventLoading

### Description

@short: Wird ausgelöst, wenn ein Event aus der Datenquelle geladen wird

@signature: onEventLoading: (ev: object) =\> boolean;

### Parameters

- `ev` - (required) *object* - Das Event-Objekt (repräsentiert das Datenobjekt)

### Returns
- ` result` - (boolean) - Bestimmt, ob die Standardaktion für das Event fortgesetzt wird (<b>true</b>) oder abgebrochen wird (<b>false</b>)

### Example

~~~jsx
scheduler.attachEvent("onEventLoading", function(ev){
    // Hier kann benutzerdefinierte Logik eingefügt werden
    return true;
});
~~~

### Details

- Dieses Event kann blockiert werden. Die Rückgabe von *false* verhindert, dass das Datenobjekt in den Scheduler geladen wird.
- Es wird für jedes Datenobjekt in der Datenquelle ausgelöst.
