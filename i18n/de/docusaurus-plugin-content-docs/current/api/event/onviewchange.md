---
sidebar_label: "onViewChange"
title: "onViewChange event"
description: "Wird ausgelöst, nachdem die aktuelle Ansicht zu einer anderen gewechselt wurde"
---

# onViewChange

### Description

@short: Wird ausgelöst, nachdem die aktuelle Ansicht zu einer anderen gewechselt wurde

@signature: onViewChange: (new_mode: string, new_date: object) =\> void

### Parameters

- `new_mode` - (required) *string* - die aktualisierte Ansicht
- `new_date` - (required) *object* - das aktualisierte Datum

### Example

~~~jsx
scheduler.attachEvent("onViewChange", function (new_mode , new_date){
    // beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird immer dann ausgelöst, wenn die aktuelle Ansicht aktualisiert wird.
