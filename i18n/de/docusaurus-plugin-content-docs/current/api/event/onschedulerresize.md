---
sidebar_label: "onSchedulerResize"
title: "onSchedulerResize event"
description: "Löst aus kurz bevor die Größe des Schedulers geändert wird"
---

# onSchedulerResize

### Description

@short: Löst aus kurz bevor die Größe des Schedulers geändert wird

@signature: onSchedulerResize: () =\> void

### Example

~~~jsx
scheduler.attachEvent("onSchedulerResize", function(){
      //beliebige benutzerdefinierte Logik hier
});
~~~

### Details

Dieses Event benachrichtigt, dass die Größe des Schedulers angepasst wurde und der Datenbereich neu gezeichnet werden muss. In der Regel ist keine Behandlung dieses Events erforderlich, außer Sie arbeiten an einer benutzerdefinierten Ansicht.
