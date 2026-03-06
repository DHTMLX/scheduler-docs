---
sidebar_label: "onOptionsLoadStart"
title: "onOptionsLoadStart event"
description: "Wird ausgelöst, kurz bevor ein Satz von Optionen oder Sektionen vom Server geladen wird (gilt nur für die Timeline-Ansicht)"
---

# onOptionsLoadStart

### Description

@short: Wird ausgelöst, kurz bevor ein Satz von Optionen oder Sektionen vom Server geladen wird (gilt nur für die Timeline-Ansicht)

@signature: onOptionsLoadStart: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onOptionsLoadStart", function (){
    //hier kann benutzerdefinierte Logik eingefügt werden
});
~~~

### Details

Dieses Event tritt ausschließlich auf, wenn eine Collection entweder über dhtxmlConnector oder durch die Verwendung der [updateCollection](api/method/updatecollection.md)-Methode geladen wird.
