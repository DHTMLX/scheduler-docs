---
sidebar_label: "onClearAll"
title: "onClearAll event"
description: "Wird ausgelöst, sobald die Daten des Schedulers gelöscht wurden"
---

# onClearAll

### Description

@short: Wird ausgelöst, sobald die Daten des Schedulers gelöscht wurden

@signature: onClearAll: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onClearAll", function (){
    //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event wird von der [clearAll](api/method/clearall.md) Methode aufgerufen.
