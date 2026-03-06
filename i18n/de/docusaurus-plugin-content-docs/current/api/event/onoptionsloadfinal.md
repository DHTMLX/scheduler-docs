---
sidebar_label: "onOptionsLoadFinal"
title: "onOptionsLoadFinal event"
description: "Wird ausgelöst, sobald das Laden einer Options-(Abschnitte-)Sammlung abgeschlossen ist (gilt nur für die Timeline-Ansicht)."
---

# onOptionsLoadFinal

### Description

@short: Wird ausgelöst, sobald das Laden einer Options-(Abschnitte-)Sammlung abgeschlossen ist (gilt nur für die Timeline-Ansicht).

@signature: onOptionsLoadFinal: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadFinal", function (){
    //Hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Details

Dieses Event tritt ausschließlich auf, wenn eine Sammlung über dhtxmlConnector oder durch Verwendung der [updateCollection](api/method/updatecollection.md)-Methode geladen wird.
